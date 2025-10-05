'use client'
import html2canvas from "html2canvas";
import { RootState, useAppDispatch, useAppSelector } from "@/base/store";
import { getMetricsByDateThunk } from "@/base/store/thunks/metrics.thunk";
import { ColorChart, OptionVisibleChart } from "@/base/utils/constant";
import { formatCurrency, formatNumberK, formatPercent, getRangeDateCompare } from "@/base/utils/func";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, Stack, TextField, ToggleButton, Typography } from "@mui/material";
import { ChartBar, DownloadSimple, Export } from "phosphor-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from "react-hot-toast";
export default function Home() {
    const chartRef = useRef<HTMLDivElement>(null);

  const dispatchAsyn = useAppDispatch()
  const { loading, compare } = useAppSelector((state: RootState) => state.metrics)
  const [selected, setSelected] = useState<OptionVisibleChart[]>([OptionVisibleChart.pos, OptionVisibleChart.eatclub, OptionVisibleChart.labour]);
  const [isCompare, setIsCompare] = useState<boolean>(true);
  useEffect(() => {
    const { fromDate, toDate, previousDate } = getRangeDateCompare()
    dispatchAsyn(getMetricsByDateThunk({ fromDate, toDate, previousDate }))
  }, [])
  const handleDate = useCallback(() => {
    const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const groupCurMetric = Object.groupBy(compare.curMetric || [], (ite) => (new Date(ite.date).getDay()))
    const groupPreMetric = Object.groupBy(compare.preMetric || [], (ite) => (new Date(ite.date).getDay()))
    const result = daysInWeek.map((day, index) => ({
      name: day,
      pos: groupCurMetric?.[index]?.reduce((sum, item) => sum + item.pos, 0) || 0,
      eatclub: groupCurMetric?.[index]?.reduce((sum, item) => sum + item.eatclub, 0) || 0,
      labour: groupCurMetric?.[index]?.reduce((sum, item) => sum + item.labourCosts, 0) || 0,
      prePos: groupPreMetric?.[index]?.reduce((sum, item) => sum + item.pos, 0) || 0,
      preEatclub: groupPreMetric?.[index]?.reduce((sum, item) => sum + item.eatclub, 0) || 0,
      preLabour: groupPreMetric?.[index]?.reduce((sum, item) => sum + item.labourCosts, 0) || 0,
    }))
    return [...result.slice(1), result[0]]
  }, [compare])

  const handleChange = (event: any) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelected((prev) => [...prev, name]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== name));
    }
  };
  const calCurTotalRevenue = useMemo(() => {
    return compare?.curMetric?.reduce((sum, item) => sum + item.eatclub + item.pos, 0) || 0
  }, [compare.curMetric])
  const calPreTotalRevenue = useMemo(() => {
    return compare?.preMetric?.reduce((sum, item) => sum + item.eatclub + item.pos, 0) || 0
  }, [compare.preMetric])
  const calPercent = (oldR: number, newR: number) => {
    if (oldR === 0) return `+${formatPercent(newR > 0 ? 100 : 0)}`
    return `${newR > oldR ? '+' : '-'}${formatPercent((newR - oldR) / oldR)}`
  }
  const handleExportImage = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "chart.png";
      link.click();
      toast.success('Dowload Request Successful!', {position: 'top-right'})
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2, borderRadius: 3 }}>
      <Stack direction={'row'} spacing={3} alignItems={'center'}>
        <Typography flex={1} variant={'h5'} fontWeight={600}>{!isCompare ? "This Week's Revenue Trend" : "This Week's Revenue Trend vs Previous Period"}</Typography>
        <FormGroup row>
          <FormControlLabel control={<Checkbox name={OptionVisibleChart.pos} onChange={handleChange} checked={selected.includes(OptionVisibleChart.pos)} />}
            label={<Typography>{'POS Revenue'}</Typography>} />
          <FormControlLabel control={<Checkbox name={OptionVisibleChart.eatclub} onChange={handleChange} checked={selected.includes(OptionVisibleChart.eatclub)} />}
            label="Eatclub Revenue" />
          <FormControlLabel control={<Checkbox name={OptionVisibleChart.labour} onChange={handleChange} checked={selected.includes(OptionVisibleChart.labour)} />}
            label="Labour Costs" />

          <ToggleButton size="small"
            value={OptionVisibleChart.compare}
            selected={isCompare}
            color="primary"
            onChange={() => setIsCompare((prevSelected) => !prevSelected)}
            sx={{
              borderRadius: "50px",
              padding: "8px 16px",
              background: 'black',
              color: 'white',
              "&:hover": {
                background: 'black', color: 'white'
              },
              "&.Mui-selected": {
                background: '#FFBF00', color: 'black'
              },
              "&.Mui-selected:hover": {
                background: '#FFBF00', color: 'black'
              },
            }}
          >
            <ChartBar size={20} />
            <Typography textTransform={'capitalize'} ml={1}> {'Compare to previous'}</Typography>
          </ToggleButton>
          <Button size="small" startIcon={<DownloadSimple />} color="primary" variant="outlined" sx={{
            ml: 1,
            borderRadius: "50px", boxShadow: 0,
            padding: "8px 16px",
          }}
            onClick={() => handleExportImage()}>
            <Typography textTransform={'capitalize'}> {'Export PNG'}</Typography>
          </Button>
        </FormGroup>

      </Stack>
      <Stack my={3} direction={'row'} spacing={3} alignItems={'center'} justifyContent={'space-around'}>
        <Box flex={1} p={2} sx={{ bgcolor: '#f1eded', borderRadius: 4, }}>
          <Typography variant="body1" color="textSecondary">{'Total Revenue'}</Typography>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography variant="h5" fontWeight={600}>{formatCurrency(calCurTotalRevenue)}</Typography>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>{`vs ${formatCurrency(calPreTotalRevenue)}`}</Typography>
            <Typography variant="body1" color={calCurTotalRevenue > calPreTotalRevenue ? 'green' : 'red'} fontWeight={600}>{`(${calPercent(calPreTotalRevenue, calCurTotalRevenue)})`}</Typography>

          </Stack>
        </Box>
        <Box flex={1} p={2} sx={{ bgcolor: '#f1eded', borderRadius: 4 }}>
          <Typography variant="body1" color="textSecondary">{'Average per Day'}</Typography>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography variant="h5" fontWeight={600}>{formatCurrency(Math.round(calCurTotalRevenue / 7))}</Typography>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>{`vs ${formatCurrency(Math.round(calPreTotalRevenue / 7))}`}</Typography>
            <Typography variant="body1" color={calCurTotalRevenue > calPreTotalRevenue ? 'green' : 'red'} fontWeight={600}>{`(${calPercent(calPreTotalRevenue / 7, calCurTotalRevenue / 7)})`}</Typography>

          </Stack>
        </Box>
        <Box flex={1} p={2} sx={{ bgcolor: '#f1eded', borderRadius: 4 }}>
          <Typography variant="body1" color="textSecondary">{'Total Covers'}</Typography>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography variant="h5" fontWeight={600}>{compare.curMetric.length}</Typography>
            <Typography variant="body1" color="textSecondary" fontWeight={600}>{`vs ${compare.preMetric.length}`}</Typography>
            <Typography variant="body1" color={calCurTotalRevenue > calPreTotalRevenue ? 'green' : 'red'} fontWeight={600}>{`(${calPercent(compare.preMetric?.length, compare.curMetric.length)})`}</Typography>

          </Stack>
        </Box>
      </Stack>
      <Box my={3} alignItems={'center'} ref={chartRef} >
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={handleDate()}
            margin={{
              top: 20,
              right: 30,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value: number) => formatNumberK(value)} />
            <Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name]}
            />
            <Legend iconType="circle" align="center" wrapperStyle={{
              display: "flex",
              flexWrap: "wrap", padding: 4, justifyContent: 'center'
            }}
              formatter={(value) => (
                <span style={{ marginRight: "20px", marginBottom: "12px", display: "inline-block" }}>
                  {value}
                </span>
              )} />
            {selected.includes(OptionVisibleChart.pos) &&
              <Bar name={'(Current) POS Revenue '} radius={[0, 0, 5, 5]} dataKey="pos" stackId="1" fill={ColorChart.pos} />}
            {selected.includes(OptionVisibleChart.eatclub) &&
              <Bar name={'(Current) Eatclub Revenue '} radius={[5, 5, 0, 0]} dataKey="eatclub" stackId="1" fill={ColorChart.eatclub} />}
            {selected.includes(OptionVisibleChart.labour) &&
              <Bar name={'(Current) Labour Costs '} radius={5} dataKey="labour" stackId="2" fill={ColorChart.labour} />}
            {isCompare && selected.includes(OptionVisibleChart.pos) &&
              <Bar name={'(Previous) Direct Revenue '} radius={[0, 0, 5, 5]} dataKey="prePos" stackId="3" fill={ColorChart.prepos} />}
            {isCompare && selected.includes(OptionVisibleChart.eatclub) &&
              <Bar name={'Total (Previous) Revenue Costs '} radius={[5, 5, 0, 0]} dataKey="preEatclub" stackId="3" fill={ColorChart.preeatclub} />}
            {isCompare && selected.includes(OptionVisibleChart.labour) &&
              <Bar name={'(Previous) Labour Costs '} radius={5} dataKey="preLabour" stackId="4" fill={ColorChart.prelabour} />}
          </BarChart>
        </ResponsiveContainer>

      </Box>
    </Paper>
  );
}
