// 'https://gisservicemt.gov/arcgis/rest/services/MSL/Montana/GeocodeServer/findAddressCandidates?SingleLine=201%20w%20grant%2059715&f=json&outSR=%7B%22wkid%22%3A102100%7D'
// 'https://services.arcgis.com/qnjIrwR8z5Izc0ij/arcgis/rest/services/Ql5J5/FeatureServer/0/query?f=json&where=&returnGeometry=false&spatialRel=esriSpatialRelIntersects&geometry=%7B%22x%22%3A-12360980.822659303%2C%22y%22%3A5726893.814342619%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryPoint&inSR=102100&outFields=*&outSR=102100'
// 'https://services.arcgis.com/qnjIrwR8z5Izc0ij/arcgis/rest/services/CChZA/FeatureServer/0/query?f=json&where=&returnGeometry=false&spatialRel=esriSpatialRelIntersects&geometry=%7B"x"%3A-12360980.822659303%2C"y"%3A5726893.814342619%2C"spatialReference"%3A%7B"wkid"%3A102100%2C"latestWkid"%3A3857%7D%7D&geometryType=esriGeometryPoint&inSR=102100&outFields=*&outSR=102100'

import { getLawmakerByDistrict } from './handling.js'

const geocodeUrl = 'https://gisservicemt.gov/arcgis/rest/services/MSL/Montana/GeocodeServer/findAddressCandidates'
const districtApis = {
    house: 'https://services.arcgis.com/qnjIrwR8z5Izc0ij/arcgis/rest/services/Ql5J5/FeatureServer/0/query',
    senate: 'https://services.arcgis.com/qnjIrwR8z5Izc0ij/arcgis/rest/services/CChZA/FeatureServer/0/query',
}

export default class DistrictMatcher {

    async matchAddressToLawmakers(address, callback, fallback){
        const res = await this.geocode(address)
        // console.log(res.candidates)
        const location = this.pickAddress(res.candidates)
        if (location){
            const houseDistrict = await this.getDistrict(location.location, res.spatialReference, districtApis.house)
            const senateDistrict = await this.getDistrict(location.location, res.spatialReference, districtApis.senate)
            const rep = getLawmakerByDistrict(houseDistrict.f7)
            const sen = getLawmakerByDistrict(senateDistrict.f7)
            const lawmakers = [rep, sen]
            callback(lawmakers, location)
        } else {
           fallback()
        }
        
    }

    async geocode(address){
        const payload = {
            SingleLine: address, // make this dynamic
            f: 'json',
        }
        const url = this.makeQuery(geocodeUrl, payload)
        const location = await fetch(url)
            .then(data => data.json())
            .catch(err => console.log(err))
        return location
    }

    async getDistrict(coords, crs, apiUrl) {
        const payload = {
            f: 'json',
            returnGeometry: 'false',
            spatialRel: 'esriSpatialRelIntersects',
            // geometry: `{"x":-12360980.822659303,"y":5726893.814342619,"spatialReference":{"wkid":102100,"latestWkid":3857}}`,
            geometry: `{"x":${coords.x},"y":${coords.y},"spatialReference":${JSON.stringify(crs)}}`,
            geometryType: 'esriGeometryPoint',
            inSR: '102100',
            outFields: '*',
            outSR: '102100',
        }
        const url = this.makeQuery(apiUrl, payload)
        const data = await fetch(url)
            .then(data => data.json())
            .then(res => res.features[0].attributes)
            .catch(err => console.log(err))
        return data
    }

    makeQuery = (url, params) => {
        let string = url + '?'
        for (let key in params){
            string = string + `${key}=${params[key].replace(/\s/g, '%20')}&`
        }
        return string
    }

    pickAddress = (candidates) => candidates[0]
}

