import { component$, $ } from "@builder.io/qwik"
import TableLoader, { filterType } from "qwik-table-loader"
import { CellData, FilterValue } from "qwik-table-loader/lib-types/types"

export default component$(() => {
  const statusOptions: FilterValue[] = [
    {
      key: 0,
      value: "Active",
    },
    {
      key: 1,
      value: "Disabled",
    },
    {
      key: 2,
      value: "Banned",
    },
    {
      key: 3,
      value: "Admin",
    },
  ]

  const data = [
    {
      id: 1,
      username: "jimmynguyen1308",
      fullName: "Jimmy Nguyen",
      dob: new Date(1998, 7, 13),
      status: 0,
    },
    {
      id: 2,
      username: "j0hndoe123",
      fullName: "John Doe",
      dob: new Date(2001, 0, 1),
      status: 1,
    },
    {
      id: 3,
      username: "a_dalton_66",
      fullName: "Alice Dalton",
      dob: new Date(2002, 5, 6),
      status: 0,
    },
    {
      id: 4,
      username: "z03bee_123",
      fullName: "Zoe Bee",
      dob: new Date(1982, 4, 18),
      status: 0,
    },
    {
      id: 5,
      username: "takashi69",
      fullName: "Tak Ashi",
      dob: new Date(1969, 8, 6),
      status: 2,
    },
  ]

  const tData = data.map((record: any) => {
    return {
      ...record,
      dob: (
        record.dob.getFullYear() +
        "-" +
        (record.dob.getMonth() + 1) +
        "-" +
        record.dob.getDate()
      ).toString(),
    }
  })

  const formatDob = $((record: CellData, heading: string) => {
    const list = record[heading]?.toString()?.split("-")
    if (list) {
      return list[2] + "/" + list[1] + "/" + list[0]
    }
    return ""
  })

  const formatStatus = $((record: CellData, heading: string) => {
    switch (record[heading]) {
      case 0:
        return (
          <span class="rounded-md bg-green-400 p-1 px-2 text-sm text-white">
            Active
          </span>
        )
      case 1:
        return (
          <span class="rounded-md bg-gray-400 p-1 px-2 text-sm text-white">
            Disabled
          </span>
        )
      case 2:
        return (
          <span class="rounded-md bg-rose-400 p-1 px-2 text-sm text-white">
            Banned
          </span>
        )
      case 3:
        return (
          <span class="rounded-md bg-orange-500 p-1 px-2 text-sm text-white">
            Admin
          </span>
        )
      default:
        return (
          <span class="rounded-md bg-gray-400 p-1 px-2 text-sm text-white">
            N/A
          </span>
        )
    }
  })

  return (
    <>
      <Link href="/">
        <span class="text-blue-500 underline">&lt;&lt; Go Back</span>
      </Link>
      <TableLoader
        tData={tData}
        element={{
          dob: formatDob,
          status: formatStatus,
        }}
        tableOptions={{
          customHeadings: {
            dob: "Date of Birth",
          },
          classNames: {
            table: "my-6 mx-3 border-2 border-[#333]",
            thead: "bg-gray-600 border-2 border-[#333]",
            th: "text-white border border-[#333] p-2 px-4",
            thContent: "h-full flex flex-col gap-1 min-w-[30px]",
            thText:
              "min-h-[24px] flex flex-row items-center justify-between gap-2",
            sortContainer:
              "flex flex-col -mr-1 size-[20] default-[#ccc] highlight-[#fff]",
            sortArrowUp: "-mb-[7px]",
            sortArrowDown: "-mt-[7px]",
            filterContainer: "min-h-[24px]",
            filterInput:
              "w-full outline-none text-black font-light p-1 px-2 rounded-md",
            tbody: "bg-gray-100",
            tr: "border border-[#ccc]",
            td: "border border-[#ccc] p-1 px-3",
            tcol: {
              id: "max-w-[80px] text-center",
              fullName: "font-bold",
              dob: "max-w-[160px] text-right",
            },
          },
          sortOptions: {
            params: ["username", "fullName", "dob", "status"],
          },
          filterOptions: {
            params: {
              username: filterType.SEARCH,
              fullName: filterType.SEARCH,
              dob: filterType.SEARCH,
              status: filterType.OPTIONS,
            },
            options: {
              status: statusOptions,
            },
          },
        }}
      />
    </>
  )
})
