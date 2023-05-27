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
  width: 100%;
  transform: translateY(-10px);
  max-width: 1300px;
  margin: 0 auto;

  @media ${({ theme }) => theme.mobileL} {
    display: inline;
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
