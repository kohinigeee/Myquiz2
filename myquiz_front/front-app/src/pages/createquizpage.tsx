import { Inter } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { Container, Row, Col } from 'react-bootstrap'
import Layout from '@/component/layout'
import CreateQuizForm from '@/component/composite/createquizform'

export default function Home() {

  return (
    <>
    <Layout title='新規作成'>

        <Container>
            <Row className='justify-content-center'>
                <Col md={6}>
                <CreateQuizForm/>
                </Col>
            </Row>
        </Container>
    </Layout>
    </>
  )
}
