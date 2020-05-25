import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios'
import Form from './components/Form'
import Song from './components/Song'
import Info from './components/Info'

function App() {

  //definir el state
  const [searchLyrics, setSearchLyrics] = useState({})
  const [lyrics, setLyrics] = useState('')
  const [info, setInfo] =useState({})

  useEffect(() =>{
    if( Object.keys(searchLyrics).length === 0 ) return

    const consultAPI = async() => {

      const {artist, song} = searchLyrics

      const url = `https://api.lyrics.ovh/v1/${artist}/${song}`
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`
      
      const [lyric, info] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ])

      setLyrics(lyric.data.lyrics)
      setInfo(info.data.artists[0])
     // setLyrics(result.data.lyrics)
    }
    consultAPI()

  }, [searchLyrics, info])


  return (
    <Fragment>
     <Form setSearchLyrics={setSearchLyrics}/>
     <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6'>
          <Info info={info}/>
        </div>
        <div className='col-md-6'>
          <Song lyrics={lyrics}/>
        </div>
      </div>

     </div>
    </Fragment>
  );
}

export default App;
