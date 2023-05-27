import { useRouter } from "next/router";
import styled from "styled-components";

function BackButton() {
  const router = useRouter()

  return (
    <Container >
      <Btn onClick={() => router.back()}>&lt;&lt; Back   </Btn>
      </Container>
  );
}

export default BackButton

const Container = styled.div`
  display: inline;
  position: absolute;
  max-width: 1300px;
  z-index: 2;
  top: -30px;
  left: 20px;
  @media ${({ theme }) => theme.mobileL} {
    /* display: none; */
  }
  `

const Btn = styled.button`
  margin: 0 auto;
  border: none;
  text-decoration: underline;
  padding: 6px;
  cursor: pointer;
  border-radius: 5px;
  text-align: start;
  margin-left: 20px;
`
