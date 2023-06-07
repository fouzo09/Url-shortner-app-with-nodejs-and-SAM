import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from './components/Header';

import FormCreateUrl from './components/FormCreateUrl';
import { BASE_URL, HEADER, USER_SESSION } from './global';
const BACKGROUND_COLOR = '#1864ab';

function Wrapper() {
  const [shortUrlList, setShortUrlList] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [displayShortedUrl, setDisplayShortedUrl] = useState(false);
  const [shortedUrl, setShortedUrl] = useState('');

  useEffect(()=>{
    (async()=>{
      await getShortURls();
    })();
  }, []);

    

  const createURl = async(event)=>{
      event.preventDefault();

      const data = {
          "alias": alias,
          "url": longUrl,
          "id": parseInt(Math.random() * 10000)
      };

      const response = await fetch(`${BASE_URL}/create/${USER_SESSION}`, {
          method: 'post',
          headers: HEADER,
          body: JSON.stringify(data)
      });

      const result = await response.json();
      setShortedUrl(result);
      setDisplayShortedUrl(true);    
      await getShortURls();
  }

  const getShortURls = async()=>{
    const response = await fetch(`${BASE_URL}/list/${USER_SESSION}`, {
        method: 'get',
        headers: HEADER
    });

    const result = await response.json();
    setShortUrlList(result);      
  }

  return (
      <Container fluid style={{ height: '100vh', backgroundColor: BACKGROUND_COLOR}}>

          <Header shortUrlList={shortUrlList}/>

          <Row style={{ paddingTop: '100px'}}>
              <Col md={{ span: 7, offset: 1 }} style={{ color: '#ffff', fontSize: '20px'}}>                  
                  <h2 style={{ fontSize: '89px', fontWeight: 900 }}>Bienvenue sur SHORTURL</h2>
                  <p style={{ fontSize: '16px', lineHeight: '2.06'}}>
                    Êtes-vous fatigué des URL longues et compliquées qui occupent un espace précieux dans vos publications 
                    sur les réseaux sociaux ou vos newsletters par e-mail ? Dites bonjour à notre raccourcisseur d'URL !
                    En quelques clics, vous pouvez transformer n'importe quelle longue URL en un lien court et facile à retenir. 
                    De plus, notre outil offre des analyses avancées afin que vous puissiez suivre les clics et voir les performances de vos liens.
                    Ne laissez pas les longues URL vous retenir plus longtemps - essayez notre raccourcisseur d'URL dès aujourd'hui !
                  </p>
                  <div style={{ fontSize: '16px', lineHeight: '2.06'}}>
                      <p>Use free this platform for create url shortner</p>
                      <ul>
                        <li>Raccourcissement facile des liens</li>
                        <li>Historique complet des liens</li>
                        <li>Lien personnalisé</li>
                      </ul>
                  </div>
              </Col>
             
              <FormCreateUrl 
                  createURl={createURl}
                  setLongUrl = {setLongUrl}
                  longUrl={longUrl}
                  setAlias={setAlias}
                  alias={alias}
                  displayShortedUrl={displayShortedUrl}
                  shortedUrl={shortedUrl}
                   />
          </Row>
      </Container>
  )
}

export default Wrapper