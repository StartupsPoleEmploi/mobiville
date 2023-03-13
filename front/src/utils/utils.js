import { useEffect, useRef, useState } from 'react'

// === STRING UTILS ===

export const ucFirst = (s) => {
  if (typeof s !== 'string') return ''
  return s?.charAt(0)?.toUpperCase() + s?.slice(1)
}

export const capitalize = (string) => ucFirst(string?.toLowerCase())

export const wordsCapitalize = (s) => {
  if (!s) return ''
  
  const wordBreakerChar = [' ', "'", '-', '.'] // on met une majuscule à la suite de ces caractères
  s = s.toLowerCase()
  wordBreakerChar.forEach(breaker => {
    s = s.split(breaker)
      .map(w => ucFirst(w))
      .join(breaker)
  })
  return s
}

// === DATE UTILS ===


export const formatDateShort = (date) => {
  const [day, month] = date.split('/')
  const months = ['dèc.', 'janv.', 'fevr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'aout', 'sept.', 'oct.', 'nov.', 'dèc.']
  return `${day} ${months[+month]}`
}

export const formatDate = (date) => date.toLocaleDateString("fr-FR")


// === FORMS UTILS

export const isDirty = (filters) => Object.values(filters).reduce((prev, currFilter) => {
  if (typeof currFilter === 'string') return prev || currFilter !== ''
  if (Array.isArray(currFilter)) return prev || currFilter?.length > 0
  return prev || !!currFilter
}, false)

// === 

const numberFormatter = Intl.NumberFormat()
export const formatNumber = (number) => numberFormatter.format(Math.floor(number))

export const useElementOnScreen = (options) => {
  const containerRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  return [containerRef, isVisible]
}

export const formatCityTension = (tension) => {
  if (tension < 4) {
    return "Opportunités d'emploi"
  }
  return "Peu d'opportunités d'emploi"
}

// trie selon le boost de visibilité : 5 > 3 > 2 > null > null ...
export const visibilityBoostSorter = (a, b) => (!b?.visibility_boost ? -1 : b?.visibility_boost - a?.visibility_boost)

// === URL UTILS ===

export const formatCityUrl = (city, codeRome) => {
  let url = `/ville/${city.insee_com}-${city.nom_comm}`
  if (!!codeRome) {
    url += `?codeRome=${codeRome}`
  }

  return url
}

export const alphabetOrder = (key) => (a, b) => a[key].localeCompare(b[key]) 

export const formatHelpUrl = (help) => `/aides/${help.slug}`

// ======

export function distance(
  lat1,
  lon1,
  lat2,
  lon2,
  unit = 'K'
) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit === 'K') {
      dist = dist * 1.609344
    }
    if (unit === 'N') {
      dist = dist * 0.8684
    }
    return dist
  }
}

export const splitSort = (array, numberOfSplits = 2) => {
  const splitLength = Math.ceil(array.length / numberOfSplits)

  let result = []
  
  let splits = []
  for (let i = 0 ; i < numberOfSplits ; i++) {
    splits[i] = array.slice(i * splitLength, (i * splitLength) + splitLength)
  }

  for (let i = 0 ; i <= splitLength ; i++) {
    splits.forEach(split => result.push(split[i]))
  }

  return result.filter(v => !!v)
}