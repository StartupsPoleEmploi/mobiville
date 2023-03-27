import React, { lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useNomPage } from '../common/contexts/NomPageContext'

const Home = lazy(() => import('./home/Home'))

const Cities = lazy(() => import('./cities/Cities'))
const City = lazy(() => import('./city/City'))
const CitySearchPage = lazy(() => import('./city/CitySearchPage'))

const Region = lazy(() => import('./region/Region'))
const Departement = lazy(() => import('./departement/Departement'))

const Helps = lazy(() => import('./helps/Helps'))
const HelpDetailsPage = lazy(() => import('./helps/HelpDetailsPage'))
const HelpFilterMobilePage = lazy(() => import('./helps/HelpsFilterMobilePage'))
const HelpsSearchPage = lazy(() => import('./helps/HelpsSearchPage'))

const GuideHome = lazy(() => import('./mobility-guide/GuideHome'))
const GuideStep1 = lazy(() => import('./mobility-guide/GuideStep1'))
const GuideStep2 = lazy(() => import('./mobility-guide/GuideStep2'))
const GuideStep3 = lazy(() => import('./mobility-guide/GuideStep3'))
const GuideStep4 = lazy(() => import('./mobility-guide/GuideStep4'))
const GuideStep5 = lazy(() => import('./mobility-guide/GuideStep5'))

const FAQ = lazy(() => import('./faq/Faq'))
const Legal = lazy(() => import('./legal/Legal'))
const Accessibility = lazy(() => import('./accessibility/Accessibility'))

export const MobivilleRoutes = () => {
  const { setNomPage } = useNomPage()
  let location = useLocation()
  useEffect(() => {
    setNomPage(location.pathname.replace('/', ''))
  }, [location])

  return (
    <Routes>
      <Route index path="/" element={<Home />} />

      <Route path="/villes" element={<Cities />} />
      <Route path="/ville/:insee" element={<City />} />
      <Route path="/ville/:insee/:section" element={<City />} />
      <Route path="/rechercher" element={<CitySearchPage />} />

      <Route path="/region/:codeSlug" element={<Region />} />
      <Route path="/departement/:codeSlug" element={<Departement />} />

      <Route path="/aides" element={<Helps />} />
      <Route path="/aides/:slug" element={<HelpDetailsPage />} />
      <Route path="/aides-filtres" element={<HelpFilterMobilePage />} />
      <Route path="/aides-recherche" element={<HelpsSearchPage />} />

      <Route path="/conseils-et-astuces" element={<GuideHome />} />
      <Route path="/conseils-et-astuces/etape-1" element={<GuideStep1 />} />
      <Route path="/conseils-et-astuces/etape-2" element={<GuideStep2 />} />
      <Route path="/conseils-et-astuces/etape-3" element={<GuideStep3 />} />
      <Route path="/conseils-et-astuces/etape-4" element={<GuideStep4 />} />
      <Route path="/conseils-et-astuces/etape-5" element={<GuideStep5 />} />

      <Route path="/faq" element={<FAQ />} />
      <Route path="/mentions-legales" element={<Legal />} />
      <Route path="/accessibilite" element={<Accessibility />} />

      {/* Redirection sur la home page si le path ne match aucune route */}
      <Route
        path="*"
        element={
          <>
            <Navigate to="/" replace />
          </>
        }
      />
    </Routes>
  )
}
