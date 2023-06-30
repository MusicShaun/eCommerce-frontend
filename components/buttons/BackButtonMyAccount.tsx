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
position: absolute;
  display: flex;
  width: fit-content;
  margin-left: 0px;
  top: 50%;
  right: 5%;
  `

const Btn = styled.button`
  border: none;
  text-decoration: underline;
  padding: 6px;
  cursor: pointer;
  border-radius: 5px;
  text-align: end;
`
