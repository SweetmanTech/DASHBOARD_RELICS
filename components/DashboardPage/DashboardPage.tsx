import Image from "next/image"
import React, { useEffect, useState } from "react"
import EthDater from "ethereum-block-by-date"
import Chart from "chart.js"
import getDefaultProvider from "../../lib/getDefaultProvider"
import getOwnersForCollection from "../../lib/alchemy/getOwnersForCollection"

const DashboardPage = () => {
  const [blockDate, setBlockDate] = useState(new Date().getTime())
  const [ownersByBlock, setOwnersByBlock] = useState([])

  useEffect(() => {
    const init = async () => {
      if (blockDate === 0) return
      const provider = getDefaultProvider(137)
      const dater = new EthDater(
        provider, // Ethers provider, required.
      )
      const block = await dater.getDate(
        new Date(blockDate), // Date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
        true, // Block after, optional. Search for the nearest block before or after the given date. By default true.
        false, // Refresh boundaries, optional. Recheck the latest block before request. By default false.
      )

      const owners = await getOwnersForCollection(block.block)
      const ownerCount = owners?.ownerAddresses?.length
      setOwnersByBlock([{ block: block.block, ownerCount, date: block.date }, ...ownersByBlock])

      const ONE_WEEK = 60 * 60 * 24 * 7 * 1000

      setBlockDate(ownerCount > 0 ? blockDate - ONE_WEEK : 0)
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockDate])

  useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: ownersByBlock.map((block) => block.date),
        datasets: [
          {
            label: "Number of Collectors",
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: ownersByBlock.map((block) => block.ownerCount),
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    }
    const ctx = (document.getElementById("line-chart") as any).getContext("2d")
    const anyWindow = window as any
    anyWindow.myLine = new Chart(ctx, config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockDate])

  return (
    <div className="mt-8 shadow-lg rounded bg-black">
      <div className="flex justify-start items-center p-4">
        <Image src="/images/logo.jpg" alt="Logo" width={100} height={100} />
      </div>

      <div className="flex items-center justify-center mt-8 shadow-lg rounded ">
        <div className="relative min-h-[500px] min-w-[100vw] bg-black">
          <canvas id="line-chart" />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
