import { useCallback, useEffect, useState } from 'react'

const Image = ({ src = '', alt = '', className }) => {
  const [files, setFiles] = useState([])

  const requireFile = useCallback((src, type) => {
    try {
      return require(`../assets/images/${src}.${type}`)
    } catch (e) {
      // console.log(`Fichier ${src}.${type} introuvable`)
      return null
    }
  }, [])

  useEffect(() => {
    ;['avif', 'webp']
      .map((type) => ({
        src: requireFile(src, type),
        type: `image/${type}`,
      }))
      .filter((e) => !!e.src)
      .forEach((file) => {
        setFiles((oldFiles) => {
          if (oldFiles.map(oldFile => oldFile.src).includes(file.src)) return oldFiles
          return [...oldFiles, file]
        })
      })
  }, [src])

  return (
    <picture className={className}>
      {files.map((file) => (
        <source key={file.src} srcSet={file.src} alt={alt} type={file.type} />
      ))}

      <img src={require(`../assets/images/${src}.png`)} alt={alt} />
    </picture>
  )
}

export default Image
