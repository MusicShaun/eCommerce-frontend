import {  useEffect, useRef, useState } from "react"
import styled from "styled-components"


interface IProps {
  info: {
    arr: string[],
    stateSetterFunction: (brand: string, color: string, size: string) => void,
    name: string
  }
}

export default function ProductFilterSideBarSelect({ info }: IProps) {

  const [selected, setSelected] = useState('')
  const selectRef = useRef(null)

  const selectors = info.arr.map((a, i) => {  
      return <option value={a}>{a}</option>
  })

  // Set state onchange
  // pass it up to parent
  function handleStateUpdate(e: any) {
    setSelected(e.target.value)
  }
  useEffect(() => {
    if (info.name === 'Brand') {
      info.stateSetterFunction(selected, '', '')
    } else if (info.name === 'Color') {
      info.stateSetterFunction('', selected, '')
    } else if (info.name === 'Size') {
      info.stateSetterFunction('', '', selected)
    } else {
      resetSelect
    }
  }, [selected])

  function resetSelect(e: HTMLSelectElement | any) {
    e.preventDefault()
    if (selectRef.current) {
      selectRef.current.value = '';
      setSelected('');
    }
  }

  return (
    <div>
      <Form >
        <SmallDarkText>{info.name}:</SmallDarkText> 
        <label htmlFor={info.name}></label>
        <Select id={info.name} onChange={(e) => handleStateUpdate(e)} ref={selectRef}>
          <option selected >- </option>
          {selectors}
        </Select>
        <Btn onClick={(e) => resetSelect(e)}>reset</Btn>
      </Form>
    </div>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
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
const Btn = styled.button`
  padding: 8px;
  margin-bottom: 8px;
  width: 20%;
  margin-left: auto;
  border: none;
`