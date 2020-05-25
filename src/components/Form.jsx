import React, {useState} from 'react'

const Form = ({setSearchLyrics}) => {

    const [search, setSearch] = useState({
        artist: '',
        song: '',
    })

    const [error, setError] = useState(false)

    const { artist, song} = search

    //función a cada input para leer su contenido
    const updateState = e => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    //consultar las APIS
    const searchInfo = e =>{
        e.preventDefault()

        if(artist.trim() === '' || song.trim() === ''){
            setError(true)
            return
        }
        setError(false)

        //Todo bien, pasar al componente principal
        setSearchLyrics(search)
    }

    return ( 
        <div className='bg-info'>
            {error ? <p className='alert alert-danger text-center p-2'>Todos los campos son obligatorios</p> : null} 
            <div className='container'>
                <div className='row'>
                    <form onSubmit={searchInfo} className='col card text-white bg-transparent mb-5 pt-5 pb-2'>
                        <fieldset>
                            <legend className='text-center'>Buscador letras canciones</legend>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>Artista</label>
                                        <input type="text" 
                                        className="form-control" 
                                        name='artist' 
                                        placeholder='Nombre Artista'
                                        onChange={updateState}
                                        value={artist}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                            <label>Canción</label>
                                            <input type="text" 
                                            className="form-control" 
                                            name='song' 
                                            placeholder='Nombre Canción'
                                            onChange={updateState}
                                            value={song}
                                            />
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary float-right'>Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Form;