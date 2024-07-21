import { Table, Badge, Paper, Card, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { handleGetBacktestResults } from '../../logic/api';
import { BacktestResult } from '../../logic/types';


const Toes: React.FC = () => {
    
    const { data = [] } = useQuery({
        queryFn: handleGetBacktestResults,queryKey:['backtests']
    });
    const displayData = data as BacktestResult[];
    return (
        <Paper withBorder p="md" radius="md" key="Backtests">
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
                <h4>VWAP Results</h4>
                <Table>
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
            </Card>
        ))}
        </Paper>
    );
    };

export default Toes;
