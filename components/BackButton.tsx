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
  display: none;
  position: relative;
  width: 100%;
  transform: translateY(-10px);

  @media ${({ theme }) => theme.mobileL} {
    display: inline;
  }
  `

const Btn = styled.button`
  margin-left: 50px;
  border: none;
  text-decoration: underline;
  padding: 5px;
  cursor: pointer;
`
