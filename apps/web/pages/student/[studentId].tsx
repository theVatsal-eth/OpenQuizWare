import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

interface StudentData {
  name: string;
  address: string;
  did: string;
  College: any[]
}

interface Props {
  data: StudentData
}

const StudentDash: React.FC<Props> = ({ data }) => {

  const studentAddress = data.address;
  const studentName = data.name
  const studentDid = data.did
  const colleges = data.College

  return (
    <div>index</div>
  )
}

export async function getStaticProps() {
  const router = useRouter()
  const { data } = await axios.get("/api/students/getStudent", { params: router.pathname })

  return {
    props: {
      data
    },
    revaldate: 10
  }
}

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.SERVER_URL}/students`)
  const paths = data.map((path: string) => path)

  return { paths, fallback: 'blocking' }
}

export default StudentDash