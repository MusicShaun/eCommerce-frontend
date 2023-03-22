import { ClotheType } from "lib/clothesSlice"
import { SetStateAction, useRef, useState } from "react"
import styled from "styled-components"


interface IProps {
  info: {
    arr: string[],
    filterByFunction: (selection: string) => void,
    name: string
  }
}

export default function ProductFilterSideBarSelect({ info }: IProps) {

  const [selected, setSelected] = useState('')

  const selectors = info.arr.map((a, i) => {  
      return <option value={a}>{a}</option>
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('filter submit')
    info.filterByFunction(selected)
  }

  return (
    <div>
      <form onChange={(e) => handleSubmit(e)}>
      <SmallDarkText>{info.name}:</SmallDarkText> 
        <label htmlFor={info.name}></label>
        <Select id={info.name} onChange={(e) => setSelected(e.target.value)}>
          <option selected >- </option>
          {selectors}
        </Select>
      </form>
    </div>
  )
}


const SmallDarkText = styled.div`
  color: black;
  padding: 10px 0;
`
const Select = styled.select`
  padding: 8px;
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`