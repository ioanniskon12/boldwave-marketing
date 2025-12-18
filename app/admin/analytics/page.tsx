'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const PageContainer = styled.div`
  max-width: 1400px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666666;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FilterLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  text-transform: uppercase;
`;

const TabsContainer = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active }) => ($active ? '#ff8c42' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#666666')};

  &:hover {
    background: ${({ $active }) => ($active ? '#ff8c42' : '#f5f5f5')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#1a1a1a')};
  }
`;

const DateInput = styled.input`
  padding: 10px 16px;
  font-size: 14px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: #ff8c42;
  }
`;

const RefreshButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #ff8c42;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  align-self: flex-end;

  &:hover {
    background: #e67d35;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const StatLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const TableCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const TableTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 14px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    text-align: right;
  }
`;

const Td = styled.td`
  padding: 16px 24px;
  font-size: 14px;
  color: #1a1a1a;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    text-align: right;
  }
`;

const PageUrl = styled.div`
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #666666;
  font-size: 14px;
`;

const ErrorState = styled.div`
  padding: 24px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 24px;
`;

const EmptyState = styled.div`
  padding: 60px;
  text-align: center;
  color: #666666;
  font-size: 14px;
`;

const ChartEmptyState = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
`;

interface AnalyticsData {
  key: string;
  clicks: number;
  impressions: number;
  ctr: string;
  position: string;
}

interface AnalyticsResponse {
  data: AnalyticsData[];
  totals: {
    clicks: number;
    impressions: number;
    ctr: string;
  };
  startDate: string;
  endDate: string;
  error?: string;
  details?: string;
}

const COLORS = ['#ff8c42', '#1a1a2e', '#16213e', '#0f3460', '#e94560', '#533483'];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [deviceData, setDeviceData] = useState<AnalyticsData[]>([]);
  const [countryData, setCountryData] = useState<AnalyticsData[]>([]);
  const [totals, setTotals] = useState({ clicks: 0, impressions: 0, ctr: '0.00' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dimension, setDimension] = useState('page');
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 28);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return date.toISOString().split('T')[0];
  });

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch main data based on selected dimension
      const params = new URLSearchParams({
        dimension,
        startDate,
        endDate,
      });

      const response = await fetch(`/api/search-console?${params}`);
      const result: AnalyticsResponse = await response.json();

      if (result.error) {
        setError(result.details || result.error);
        return;
      }

      setData(result.data);
      setTotals(result.totals);

      // Fetch device data for pie chart
      const deviceParams = new URLSearchParams({
        dimension: 'device',
        startDate,
        endDate,
      });
      const deviceResponse = await fetch(`/api/search-console?${deviceParams}`);
      const deviceResult: AnalyticsResponse = await deviceResponse.json();
      if (!deviceResult.error) {
        setDeviceData(deviceResult.data);
      }

      // Fetch country data for pie chart
      const countryParams = new URLSearchParams({
        dimension: 'country',
        startDate,
        endDate,
      });
      const countryResponse = await fetch(`/api/search-console?${countryParams}`);
      const countryResult: AnalyticsResponse = await countryResponse.json();
      if (!countryResult.error) {
        setCountryData(countryResult.data.slice(0, 6)); // Top 6 countries
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDimensionLabel = () => {
    switch (dimension) {
      case 'page':
        return 'Page';
      case 'query':
        return 'Search Query';
      case 'country':
        return 'Country';
      case 'device':
        return 'Device';
      default:
        return 'Item';
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Prepare data for pie charts
  const devicePieData = deviceData.map((item) => ({
    name: item.key.charAt(0).toUpperCase() + item.key.slice(1),
    value: item.clicks,
    impressions: item.impressions,
  }));

  const countryPieData = countryData.map((item) => ({
    name: item.key,
    value: item.clicks,
    impressions: item.impressions,
  }));

  // Prepare data for bar chart (top 5 pages)
  const barChartData = data.slice(0, 5).map((item) => {
    // Extract just the path from URL
    let label = item.key;
    try {
      const url = new URL(item.key);
      label = url.pathname || '/';
    } catch {
      label = item.key;
    }
    // Truncate long labels
    if (label.length > 25) {
      label = label.substring(0, 22) + '...';
    }
    return {
      name: label,
      clicks: item.clicks,
      impressions: item.impressions,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #eee',
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, marginBottom: '4px' }}>
            {payload[0].name}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
            Clicks: {formatNumber(payload[0].value)}
          </p>
          {payload[0].payload.impressions && (
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
              Impressions: {formatNumber(payload[0].payload.impressions)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <Header>
        <Title>Search Console Analytics</Title>
        <Subtitle>
          View your Google Search Console performance data including clicks, impressions, and rankings.
        </Subtitle>
      </Header>

      <TabsContainer>
        <Tab $active={dimension === 'page'} onClick={() => setDimension('page')}>
          Pages
        </Tab>
        <Tab $active={dimension === 'query'} onClick={() => setDimension('query')}>
          Search Queries
        </Tab>
        <Tab $active={dimension === 'country'} onClick={() => setDimension('country')}>
          Countries
        </Tab>
        <Tab $active={dimension === 'device'} onClick={() => setDimension('device')}>
          Devices
        </Tab>
      </TabsContainer>

      <FiltersRow>
        <FilterGroup>
          <FilterLabel>Start Date</FilterLabel>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>End Date</FilterLabel>
          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FilterGroup>

        <RefreshButton onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Data'}
        </RefreshButton>
      </FiltersRow>

      {error && (
        <ErrorState>
          <strong>Error:</strong> {error}
        </ErrorState>
      )}

      <StatsGrid>
        <StatCard>
          <StatLabel>Total Clicks</StatLabel>
          <StatValue>{formatNumber(totals.clicks)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Total Impressions</StatLabel>
          <StatValue>{formatNumber(totals.impressions)}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Average CTR</StatLabel>
          <StatValue>{totals.ctr}%</StatValue>
        </StatCard>
      </StatsGrid>

      {!loading && data.length > 0 && (
        <ChartsGrid>
          <ChartCard>
            <ChartTitle>Clicks by Device</ChartTitle>
            {devicePieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={devicePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent || 0) * 100).toFixed(0)}%`
                    }
                  >
                    {devicePieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState>No device data available</ChartEmptyState>
            )}
          </ChartCard>

          <ChartCard>
            <ChartTitle>Clicks by Country (Top 6)</ChartTitle>
            {countryPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={countryPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent || 0) * 100).toFixed(0)}%`
                    }
                  >
                    {countryPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ChartEmptyState>No country data available</ChartEmptyState>
            )}
          </ChartCard>
        </ChartsGrid>
      )}

      {!loading && barChartData.length > 0 && (
        <ChartCard style={{ marginBottom: '32px' }}>
          <ChartTitle>Top 5 Pages Performance</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData} layout="vertical" margin={{ left: 20, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
              <Bar dataKey="clicks" name="Clicks" fill="#ff8c42" radius={[0, 4, 4, 0]} />
              <Bar
                dataKey="impressions"
                name="Impressions"
                fill="#1a1a2e"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}

      <TableCard>
        <TableHeader>
          <TableTitle>Performance by {getDimensionLabel()}</TableTitle>
        </TableHeader>

        {loading ? (
          <LoadingState>Loading analytics data...</LoadingState>
        ) : data.length === 0 ? (
          <EmptyState>
            No data available for the selected date range.
            <br />
            Make sure your site is verified in Google Search Console and has some traffic.
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>{getDimensionLabel()}</Th>
                <Th>Clicks</Th>
                <Th>Impressions</Th>
                <Th>CTR</Th>
                <Th>Avg Position</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <Td>
                    <PageUrl title={row.key}>{row.key}</PageUrl>
                  </Td>
                  <Td>{formatNumber(row.clicks)}</Td>
                  <Td>{formatNumber(row.impressions)}</Td>
                  <Td>{row.ctr}%</Td>
                  <Td>{row.position}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableCard>
    </PageContainer>
  );
}
