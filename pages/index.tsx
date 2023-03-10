import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Pdf from '../app/features/Pdf';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PDF 병합기</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Pdf></Pdf>
    </div>
  )
}
