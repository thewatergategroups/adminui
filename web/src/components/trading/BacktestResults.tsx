import { Table, Badge, Paper, Card } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { handleGetBacktestResults } from '../../logic/api';
import { BacktestResult } from '../../logic/types';


const Toes: React.FC = () => {
    
    const { data = [] } = useQuery({
        queryFn: handleGetBacktestResults,queryKey:['backtests']
    });
    const displayData = data as BacktestResult[];
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
            </Card>
        ))}
        </div>
    );
    };

export default Toes;
