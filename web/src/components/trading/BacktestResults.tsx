import { Table, Badge, Card, Button } from '@mantine/core';
import { AreaChart } from '@mantine/charts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handleGetBacktestResults } from '../../logic/api';
import { BacktestDataItem, BacktestResult } from '../../logic/types';
import { useState } from 'react';
import Modal from '../shared/Modal';
import { handleGetBacktestResultsData } from '../../logic/api';
import { startOfHour, parseISO,format } from 'date-fns';

interface AggregatedData {
    [key: string]: {
      timestamp: string;
      buying_power: number;
      count: number;
    };
  }

  
const BacktestResults: React.FC = () => {
    const queryClient = useQueryClient()
    const { data = [] } = useQuery({
        queryFn: handleGetBacktestResults,queryKey:['backtests']
    });
    const displayData = data as BacktestResult[];
    const [modalOpened, setModalOpened] = useState(false);
    const [chartData, setChartData] = useState<{ timestamp: string; buying_power: number }[]>([]);
  

    const fetchChartDataWithCache = async (id: number) => {
        const cachedData = queryClient.getQueryData<BacktestDataItem[]>(['chartData', id]);
        if (cachedData) {
          return cachedData;
        } else {
          const response = await handleGetBacktestResultsData(id);
          return response;
        }
      };

    const { mutate: getChartData, isPending: isFetchingChartData } = useMutation({
        mutationFn: (id: number) => fetchChartDataWithCache(id),
        onSuccess: (data: BacktestDataItem[] | null,variables) => {
            // Aggregate data to hourly intervals
            if (data === null) {
                setChartData([])
                return
            }
            const aggregatedData = data.reduce((acc: AggregatedData, item) => {
              const hour = startOfHour(parseISO(item.timestamp)).toISOString();
              if (!acc[hour]) {
                acc[hour] = { timestamp: hour, buying_power: 0, count: 0 };
              }
              acc[hour].buying_power += item.buying_power;
              acc[hour].count += 1;
              return acc;
            }, {} as AggregatedData);
      
            const transformedData = Object.values(aggregatedData).map((item) => ({
              timestamp: format(parseISO(item.timestamp), 'yyyy-MM-dd HH:mm'),
              buying_power: item.buying_power / item.count, // Average buying power for the hour
            }));
      
            setChartData(transformedData);
            setModalOpened(true);
            queryClient.setQueryData(['chartData', variables], transformedData);  
        },
        }
      );
    
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
            <p><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}</p>
            <p><strong>Symbols:</strong> {result.symbols.join(', ')}</p>
            {result.result && result.result.vwap && (
                <div>
                <h4>Results</h4>
                <Table verticalSpacing="sm" highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Symbol</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Cost Basis</Table.Th>
                            <Table.Th>Market Value</Table.Th>
                            <Table.Th>Current Price</Table.Th>
                            <Table.Th>Unrealized P&L</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                    {Object.values(result.result.vwap.positions.positions_held).map((position) => (
                        <Table.Tr key={position.asset_id}>
                        <Table.Td>{position.symbol}</Table.Td>
                        <Table.Td>{position.qty}</Table.Td>
                        <Table.Td>{position.cost_basis}</Table.Td>
                        <Table.Td>{position.market_value}</Table.Td>
                        <Table.Td>{position.current_price}</Table.Td>
                        <Table.Td>{position.unrealized_pl}</Table.Td>
                        </Table.Tr>
                    ))}

                    </Table.Tbody>
                </Table>
                </div>
            )}
            {result.strategies && (
                <div>
                <h4>Strategies</h4>
                {result.strategies.map((strategy, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{strategy.name} (Alias: {strategy.alias})</strong>
                    <ul>
                        {strategy.conditions.map((condition, idx) => (
                        <li key={idx}>
                            {condition.name} - Type: {condition.type}, Active: {condition.active ? 'Yes' : 'No'}, Variables: {JSON.stringify(condition.variables)}
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
            )}
             <Button onClick={() => getChartData(result.id)} disabled={isFetchingChartData}>
            Fetch Chart Data
          </Button>
            </Card>
        ))}
    <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Backtest Results"
        size="100%"
      >
        {chartData.length ? (
            <AreaChart
              h={700}
              data={chartData}
              dataKey="timestamp"
              series={[
                {name: 'buying_power',label: "Buying Power", color: 'indigo.9'}
              ]}
              curveType="linear"
              xAxisLabel='Time'
              yAxisLabel='$ (Dollars)'
              yAxisProps={{ tickMargin: 15, domain: ['auto', 'dataMax + 10'], orientation: 'left' }}
              xAxisProps={{ tickFormatter: (timestamp, index) => {
                // Show label for every nth data point (e.g., every 5th point)
                const showLabel = 5;
                return index % showLabel === 0 ? format(parseISO(timestamp), 'MM-dd HH') : '';
              }, orientation: 'bottom' }}
              connectNulls
              withLegend
              legendProps={{
                align: 'left',
                verticalAlign: 'bottom',
                layout: 'horizontal',
                wrapperStyle: { paddingLeft: '20px' }
              }}
            />
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
        </div>
    );
    };

export default BacktestResults;
