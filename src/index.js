import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';


import './assets/styles/index.scss';
import './assets/styles/banners.scss';
import './assets/styles/fonts.scss';
import './assets/styles/output.css'

import App from './App';
import {BrowserRouter} from "react-router-dom";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './assets/locales/en.json';
import ruTranslation from './assets/locales/ru.json';
import deTranslation from './assets/locales/de.json';
import uaTranslation from './assets/locales/ua.json';
import spTranslation from './assets/locales/sp.json';
import Cookies from "js-cookie";
import {ThemeProvider} from "./utils/contexts/ThemeProvider";
import {Provider} from "mobx-react";
import tokenStore from "./stores/TokenStore";
import userStore from "./stores/UserStore";
import searchQueryStore from "./stores/SearchQueryStore";
import {CssVarsProvider} from "@mui/joy";
import axios from "axios";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslation.translation
            },
            ru: {
                translation: ruTranslation.translation
            },
            de: {
                translation: deTranslation.translation
            },
            ua: {
                translation: uaTranslation.translation
            },
            sp: {
                translation: spTranslation.translation
            }
        },
        lng: Cookies.get('language') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = "https://localhost:7000/"

root.render(
      <BrowserRouter>
          <CssVarsProvider defaultMode="system">
              <Provider tokenStore={tokenStore} userStore={userStore} searchQueryStore={searchQueryStore} >
                  <ThemeProvider>
                    <App />
                  </ThemeProvider>
              </Provider>
          </CssVarsProvider>
      </BrowserRouter>
);

