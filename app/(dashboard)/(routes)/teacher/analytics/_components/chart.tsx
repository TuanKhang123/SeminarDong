"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Text,
  Cell,
  Tooltip
} from "recharts";
import Image from "next/image";

import { Card } from "@/components/ui/card";

interface ChartProps {
  data: {
    name: string;
    total: number;
    image: string;
  }[];
}



const CustomTick = (props: any) => {

  const { x, y, payload, data } = props
  const itemDate = data.find((item: any) =>
    item?.name === payload?.value
  )
  return (
    <image
      // href={payload.value.imageUrl} // Make sure this points to a valid image URL
      href={itemDate?.image}
      x={x - 85}
      y={y - 37}
      width="80"
      height="80"
    />
  )
}

const CustomTooltip = (props: any) => {
  const item = props?.data.find((i: any) => i.name === props?.label)
  
  if (props) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Name course: ${props?.label}`}</p>
        <p className="label">{`Quantity: ${item?.count}`}</p>
      </div>
    );
  }

  return null;
};

export const Chart = ({
  data
}: ChartProps) => {
  return (
    <Card>
      <div style={{ height: '450px', overflowY: 'auto' }}>
        <ResponsiveContainer width="100%" debounce={50} >
          <BarChart data={data} layout="vertical">
            <XAxis
              hide
              axisLine={false}
              type="number"
            />
            <YAxis
              yAxisId={0}
              dataKey="name"
              type="category"
              tick={(props) => <CustomTick {...props} data={data} />}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip  data={data}/>} />

            <YAxis
              orientation="right"
              yAxisId={1}
              dataKey="total"
              type="category"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
              mirror
            />
            <Bar
              dataKey="total"
              minPointSize={2}
              barSize={32}
              fill="#0369a1">
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}