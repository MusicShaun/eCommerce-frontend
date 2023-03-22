import styled from "styled-components"


interface IProps {
  info: {
    arr: string[],
    filterByBrand: () => string,
    name: string
  }
}

export default function ProductFilterSideBarSelect({ info }: IProps) {

  // map over info.brands to create select options 
  // add onChange event to select element
  // call info.filterByBrand() on change
  const selectors = info.arr.map((a, i) => {  
      return <option value={a}>{a}</option>
  })


  return (
    <div>
      <form onSubmit={info.filterByBrand}>
      <SmallDarkText>{info.name}:</SmallDarkText> 
        <label htmlFor={info.name}></label>
        <Select id={info.name}>
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