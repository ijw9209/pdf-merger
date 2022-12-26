import type { NextPage, InferGetServerSidePropsType, GetServerSideProps } from 'next';
import PDFMerger from 'pdf-merger-js/browser';
import React, { useEffect, useState } from 'react';

import styles from '../../styles/Pdf.module.css';

const Pdf = () => {

    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState([]);	//파일
    
    
    const [mergedPdfUrl, setMergedPdfUrl] = useState('');

    const handleChangeFile = (event:any) => {
        console.log(event.target.files);
        setImgFile(event.target.files);

        setImgBase64([]);

        for(var i=0;i<event.target.files.length;i++){
            if (event.target.files[i]) {
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
                // 파일 상태 업데이트
                reader.onloadend = () => {
                    // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                  const base64 = reader.result;
                //   console.log(base64)
                  if (base64) {
                  //  images.push(base64.toString())
                  var base64Sub = base64.toString()
                //   console.log(base64Sub);
                //   setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                  //  setImgBase64(newObj);
                    // 파일 base64 상태 업데이트
                  //  console.log(images)
                  }
                }
            }

        }

    }

    const handleMerge = async () =>{

        console.log(imgFile);
        console.log(imgFile.length);
        if(imgFile.length === 0 ) {
            alert('파일을 하나라도 선택해줘요용 (찡긋)');
            return false;
        }
        
        const merger = new PDFMerger();



        if(imgFile) {
            for(const file of imgFile) {
                await merger.add(file)
            }

            const mergedPdf = await merger.saveAsBlob();
            const url = URL.createObjectURL(mergedPdf);

            console.log(merger);

            return setMergedPdfUrl(url);
        }
    }


    const handleCancel = () => {
        // setMergedPdfUrl('');
        // setImgFile([]);
        location.reload();
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentWrap}>
            <p>PDF 병합기를 만들었어요!</p> 
            <p>다중선택시 Ctrl + 마우스 클릭으로 다중선택할수 있어요</p>
            <input
                type="file"
                multiple={true}
                onChange={handleChangeFile}
                
            ></input>
            <button onClick={handleMerge} >PDF 병합</button>
            <button style={{marginLeft : '20px'}} onClick={handleCancel}>취소</button>
            </div>
            <div style={{marginTop : '30px'}}>
            <iframe
              height={1000}
              src={`${mergedPdfUrl}`}
              title='pdf-viewer'
              width='100%s'
            ></iframe>
            </div>
        </div>
    )
}

export default Pdf;


