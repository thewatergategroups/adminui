import { Table, Badge, Card, Button, Paper, Text, Group } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleGetBacktestResults, handleGetBacktestResultsData } from '../../logic/api';
import { BacktestDataItem, BacktestResult } from '../../logic/types';
import { useState } from 'react';
import Modal from '../shared/Modal';
import { startOfHour, parseISO, format } from 'date-fns';

interface LegendItem {
    color: string;
    label: string;
  }
  
  interface CustomLegendProps {
    items: LegendItem[];
  }
  
  const CustomLegend: React.FC<CustomLegendProps> = ({ items }) => {
    return (
      <Group>
        {items.map((item, index) => (
          <Group key={index}>
            <div style={{ width: 12, height: 12, backgroundColor: item.color }}></div>
            <Text>{item.label}</Text>
          </Group>
        ))}
      </Group>
    );
  };

interface AggregatedData {
  [key: string]: {
    timestamp: string;
    buying_power: number;
    buys: number;
    sells: number;
    stock_values: { [symbol: string]: number };
    stock_counts: { [symbol: string]: string };
  };
}

interface TransformedData {
  timestamp: string;
  buying_power: number;
  equity: number;
  buys: number;
  sells: number;
  stock_counts: { [symbol: string]: string };
  [key: string]: any;
}

interface StockCount {
    [symbol: string]: number;
  }
  
  interface PayloadItem {
    timestamp: string;
    buying_power: number;
    equity: number;
    buys: number;
    sells: number;
    stock_counts: StockCount;
  }
  

  interface ChartTooltipProps {
    payload?: { payload: PayloadItem }[];
  }
  
  const ChartTooltip: React.FC<ChartTooltipProps> = ({ payload }) => {
    
      if (!payload || !payload.length) return null;
  
    const { buying_power, equity, buys, sells, stock_counts } = payload[0].payload;
    return (
      <Paper px="md" py="sm" withBorder shadow="md" radius="md">
        <Text size="sm">{`Buying Power: $${buying_power.toFixed(2)}`}</Text>
        <Text size="sm">{`Overall Equity: $${equity.toFixed(2)}`}</Text>
        <Text size="sm">{`Buys: ${buys}`}</Text>
        <Text size="sm">{`Sells: ${sells}`}</Text>
        {Object.entries(stock_counts).map(([symbol, count]) => (
          <Text key={symbol} size="sm">{`${symbol}: ${count}`}</Text>
        ))}
      </Paper>
    );
  };

const BacktestResults: React.FC = () => {
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({
    queryFn: handleGetBacktestResults,
    queryKey: ['backtests'],
  });
  const displayData = data as BacktestResult[];
  const [modalOpened, setModalOpened] = useState(false);
  const [chartData, setChartData] = useState<TransformedData[]>([]);

  const fetchChartDataWithCache = async (id: number) => {
    // const cachedData = queryClient.getQueryData<BacktestDataItem[]>(['chartData', id]);
    // if (cachedData) {
    //   return cachedData;
    // } else {
      const response = await handleGetBacktestResultsData(id);
      return response;
    // }
  };

  const { mutate: getChartData, isPending: isFetchingChartData } = useMutation({
    mutationFn: (id: number) => fetchChartDataWithCache(id),
    onSuccess: (data: BacktestDataItem[] | null, variables) => {
      if (data === null) {
        setChartData([]);
        return;
      }

      const aggregatedData = data.reduce((acc: AggregatedData, item) => {
        const hour = startOfHour(parseISO(item.timestamp)).toISOString();
        if (!acc[hour]) {
          acc[hour] = {
            timestamp: hour,
            buying_power: 0,
            buys: 0,
            sells: 0,
            stock_values: {},
            stock_counts: {},
          };
        }
        acc[hour].buying_power = item.buying_power;
        acc[hour].buys = item.buys;
        acc[hour].sells = item.sells;
      
        // Aggregate stock values
        Object.entries(item.positions).forEach(([symbol, details]) => {
          const currentValue = parseFloat(details.current_price) * parseFloat(details.qty);
          acc[hour].stock_values[symbol] = currentValue;
          acc[hour].stock_counts[symbol] = details.qty;
        });
      
        return acc;
      }, {} as AggregatedData);
      
      const transformedData = Object.values(aggregatedData).map((item) => ({
        timestamp: format(parseISO(item.timestamp), 'yyyy-MM-dd HH:mm'),
        buying_power: item.buying_power,
        equity: (item.buying_power + Object.values(item.stock_values).reduce((acc, value) => acc + value, 0)) , // Overall equity
        buys: item.buys,
        sells: item.sells,
        stock_counts: item.stock_counts,
        ...item.stock_values,
      }));
      setChartData(transformedData);
      setModalOpened(true);
      queryClient.setQueryData(['chartData', variables], transformedData);
    },
  });

  return (
    <div>
      {displayData.map((result) => (
        <Card key={result.id} style={{ marginBottom: '20px' }}>
          <h3>
            Backtest ID: {result.id}{' '}
            <Badge color={result.status === 'completed' ? 'green' : 'red'}>
              {result.status}
            </Badge>
          </h3>
          <p>
            <strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}
          </p>
          <p>
            <strong>Symbols:</strong> {result.symbols.join(', ')}
          </p>
          {result.result && result.result.vwap && (
            <div>
              <h4>Results</h4>
              <Table verticalSpacing="sm" highlightOnHover>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Cost Basis</th>
                    <th>Market Value</th>
                    <th>Current Price</th>
                    <th>Unrealized P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(result.result.vwap.positions.positions_held).map((position) => (
                    <tr key={position.asset_id}>
                      <td>{position.symbol}</td>
                      <td>{position.qty}</td>
                      <td>{position.cost_basis}</td>
                      <td>{position.market_value}</td>
                      <td>{position.current_price}</td>
                      <td>{position.unrealized_pl}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        {result.strategies && (
        <div>
            <h4>Strategies</h4>
            {result.strategies.map((strategy, index) => (
            <Card key={index} shadow="sm" padding="lg" style={{ marginBottom: '20px' }}>
                <Text size="lg" mb="sm">
                <strong>{strategy.name} (Alias: {strategy.alias})</strong>
                </Text>
                <Table striped highlightOnHover>
                <thead>
                    <tr>
                    <th>Condition Name</th>
                    <th>Type</th>
                    <th>Active</th>
                    <th>Variables</th>
                    </tr>
                </thead>
                <tbody>
                    {strategy.conditions.map((condition, idx) => (
                    <tr key={idx}>
                        <td><strong>{condition.name}</strong></td>
                        <td>{condition.type}</td>
                        <td>{condition.active ? 'Yes' : 'No'}</td>
                        <td>
                        <Table>
                            <tbody>
                            {Object.entries(condition.variables).map(([key, value], varIdx) => (
                                <tr key={varIdx}>
                                <td>{key}</td>
                                <td>{value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Card>
            ))}
        </div>
        )}

          <Button onClick={() => getChartData(result.id)} disabled={isFetchingChartData || result.status !=="completed"}>
            Fetch Chart Data
          </Button>
        </Card>
      ))}
    <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Backtest Results" size="100%">
    {chartData.length ? (
        <>
        <AreaChart
        h={700}
        data={chartData}
        dataKey="timestamp"
        unit="$"
        series={[
            { name: 'buying_power', label: 'Buying Power', color: 'green' },
            { name: 'equity', label: 'Overall Equity', color: 'blue' },
            ...Object.keys(chartData[0])
                .filter(
                    (key) =>
                    key !== 'timestamp' &&
                    key !== 'buying_power' &&
                    key !== 'equity' &&
                    key !== 'buys' &&
                    key !== 'sells' &&
                    key !== 'stock_counts'
                )
            .map((symbol, index) => ({
                name: symbol,
                label: symbol,
                color: `hsl(${(index * 137.5) % 360}, 50%, 50%)`,
            })),
        ]}
        curveType="linear"
        xAxisLabel="Time"
        yAxisLabel="$ (Dollars)"
        yAxisProps={{
            tickMargin: 15,
            domain: ['auto', 'dataMax + 10'],
            orientation: 'left',
        }}
        xAxisProps={{
            tickFormatter: (timestamp, index) => {
            const showLabel = 5;
            return index % showLabel === 0 ? format(parseISO(timestamp), 'MM-dd HH') : '';
            },
            orientation: 'bottom',
        }}
        connectNulls
        // withLegend
        tooltipProps={{
            content: ({payload}) => <ChartTooltip payload={payload as any} />,
        }}

        />
        <CustomLegend
        items={[
          { color: 'green', label: 'Buying Power' },
          { color: 'blue', label: 'Overall Equity' },
          ...Object.keys(chartData[0])
            .filter(
              (key) =>
                key !== 'timestamp' &&
                key !== 'buying_power' &&
                key !== 'equity' &&
                key !== 'buys' &&
                key !== 'sells' &&
                key !== 'stock_counts'
            )
            .map((symbol, index) => ({
              color: `hsl(${(index * 137.5) % 360}, 50%, 50%)`,
              label: symbol,
            })),
        ]}
      />
      </>
    ) : (
        <div>Loading...</div>
    )}
    </Modal>
    </div>
  );
};

export default BacktestResults;
