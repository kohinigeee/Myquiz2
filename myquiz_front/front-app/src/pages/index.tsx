import { useForm } from 'react-hook-form'
import Layout from '@/component/layout'
import { Col, Container, Row } from 'react-bootstrap'
import QuizListSelecorTab from '@/component/composite/quizlistselectortab'
import { Quiz } from '@/lib/quiz'
import { useEffect, useState } from 'react'
import QuizManager from '@/component/quizmode/quizmanager'


export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [quizList, setQuizList] = useState<Quiz[] | undefined>(undefined);

  const onGameStartCategory = ( quizList : Quiz[] ) => {
    setTimeout(() => {
      setQuizList(quizList)
    }, 500)
  }
  const createContent = () => {
    if (quizList) {
      return (
        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <QuizManager quizlist={quizList} onReturnHome={() => setQuizList(undefined)}></QuizManager>
          </Col>
        </Row>
      )
    }
    return (
      <QuizListSelecorTab onGameStartCategory={onGameStartCategory}></QuizListSelecorTab>
    )
  }

  return (
    <>
      <Layout title='ホーム'>
        <Container className='mt-5'>
          { createContent() }
        </Container>
      </Layout>
    </>
  )
}
