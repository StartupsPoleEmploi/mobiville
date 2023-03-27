import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'
import { MOBILE_WIDTH } from '../constants/mobile'

const Picture = styled.picture``

const Source = styled.source`
  ${({ $isMobile }) => $isMobile && css`
    max-width: 100%;
  `}
`

const Img = styled.img`
  ${({ $isMobile }) => $isMobile && css`
    max-width: 100%;
  `}
`

const Image = ({ src, alt = '', className, isUrlSrc = false, style = {} }) => {
  const DESKTOP = 'desktop'
  const MOBILE = 'mobile'

  const isMobile = isMobileView(useWindowSize())

  const [files, setFiles] = useState([])
  const [defaultType, setDefaultType] = useState(null)

  const requireFile = useCallback((src, type) => {
    try {
      return require(`../assets/images/${src}.${type}`)
    } catch (e) {
      return null
    }
  }, [])

  useEffect(() => {
    let files = ['avif', 'webp', 'png', 'jpg']
      .flatMap((type) => {
        // aucune recherche de mobile pour les isUrlSrc
        if (isUrlSrc) {
          return {
            src: src.split('.')[0],
            type,
            mimeType: `image/${type}`,
          }
        }
        return [DESKTOP, MOBILE].map((customMedia) => {
          let customSrc = customMedia === MOBILE ? `${src}-mobile` : src

          return {
            customMedia: customMedia,
            src: requireFile(customSrc, type),
            type,
            mimeType: `image/${type}`,
          }
        })
      })
      .filter((img) => !!img.src)

    // si des versions mobiles sont trouvés, on ajoute les media
    if (!!files.find((file) => file.customMedia === MOBILE)) {
      files = files.map((file) => {
        let media = null
        switch (file.customMedia) {
          case MOBILE:
            media = `(max-width: ${MOBILE_WIDTH}px)`
            break
          default:
          case DESKTOP:
            media = `(min-width: ${MOBILE_WIDTH + 1}px)`
            break
        }

        return {
          src: file.src,
          type: file.type,
          mimeType: file.mimeType,
          media: media,
        }
      })
    }

    setFiles(files)
  }, [src])

  useEffect(() => {
    if (isUrlSrc || !files || files.length < 1) return

    if (!!files.find((file) => file.type === 'png')) {
      setDefaultType('png')
    } else {
      setDefaultType('jpg')
    }
  }, [files, isUrlSrc])

  return (
    <Picture className={className} style={{ ...style }}>
      {files.map((file) => (
        <Source
          key={file.src + file.type}
          srcSet={isUrlSrc ? `${file.src}.${file.type}` : file.src}
          alt={alt}
          type={file.mimeType}
          media={file.media}
        />
      ))}

      {!defaultType ? null : (
        <Img
          $isMobile={isMobile}
          src={
            isUrlSrc ? src : require(`../assets/images/${src}.${defaultType}`)
          }
          alt={alt}
          loading="lazy"
        />
      )}
    </Picture>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  isUrlSrc: PropTypes.bool,
  style: PropTypes.object,
}

export default Image
