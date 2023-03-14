import styled from "styled-components"
import NavSneakers from "./NavShoes"
import NavShirts from "./NavShirts"

export default function Nav() {




  return (
    <Wrapper> 
      <Container>

      </Container>
    </Wrapper>
  )
}
const Wrapper = styled.div` 
  position: absolute; 
  width: 100%;
  display: flex;
  justify-content: center;
`
const Container = styled.div`
  width: 90%;
  max-width: 1220px;
  height: 390px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`