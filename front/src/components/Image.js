import { useCallback, useEffect, useState } from 'react'

const Image = ({ src = '', alt = '', className, isUrlSrc = false }) => {
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
        src: isUrlSrc ? src.split('.')[0] : requireFile(src, type),
        type,
        mimeType: `image/${type}`,
      }))
      .filter((e) => !!e.src)
      .forEach((file) => {
        setFiles((oldFiles) => {
          if (oldFiles.map((oldFile) => oldFile.src).includes(file.src))
            return oldFiles
          return [...oldFiles, file]
        })
      })
  }, [src])

  return (
    <picture className={className}>
      {files.map((file) => (
        <source
          key={file.src + file.type}
          srcSet={isUrlSrc ? `${file.src}.${file.type}` : file.src}
          alt={alt}
          type={file.mimeType}
        />
      ))}

      <img
        src={isUrlSrc ? src : require(`../assets/images/${src}.png`)}
        alt={alt}
        loading="lazy"
      />
    </picture>
  )
}

export default Image
