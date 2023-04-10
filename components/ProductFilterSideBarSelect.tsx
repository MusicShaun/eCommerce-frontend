import {  useEffect, useRef, useState } from "react"
import styled from "styled-components"

interface IProps {
  info: {
    name: string,
    arr: string[],
    stateSetterFunction: (name: string, value: string) => void,
    childStateSetterFunction: (name: string) => void
  }
}

export default function ProductFilterSideBarSelect({ info }: IProps) {

  const [selected, setSelected] = useState('')
  const selectRef = useRef<HTMLSelectElement>(null)

  const selectors = info.arr.map((a, i) => {  
    return <option value={a} key={i}>{a}</option>
  })

  // Set state onchange
  // pass it up to parent
  function handleStateUpdate(e: any) {
    setSelected(e.target.value)
  }

  // set filter state in parent component or reset
  useEffect(() => {
    switch (info.name) {
      case 'brand':
      case 'color':
      case 'sizes':
        info.stateSetterFunction(info.name, selected)
        break;
      default:
        resetSelect
        break;
    }
  }, [selected])

  // Reset state in parent component
  // Reset value of useRef's
  function resetSelect(e: HTMLSelectElement | any) {
    e.preventDefault()
    switch (info.name) {
      case 'brand':
      case 'color':
      case 'size':
        info.childStateSetterFunction(info.name)
        break;
      default:
        break;
    }

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
          <option value='' >- </option>
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

  @media ${({ theme }) => theme.mobileL} {
    flex-direction: row;
  }
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

  @media ${({ theme }) => theme.mobileL} {
    margin: 10px 10px;
  }
`
const Btn = styled.button`
  padding: 8px;
  margin-bottom: 8px;
  width: 20%;
  margin-left: auto;
  border: none;
`