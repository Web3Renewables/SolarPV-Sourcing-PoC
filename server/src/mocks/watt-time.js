const mockTimezone = {
  "details": {
    "id": 1195480,
    "name": "Sample name",
    "accountId": 64976,
    "status": "Active",
    "peakPower": 9.425,
    "lastUpdateTime": "2022-08-26",
    "installationDate": "2019-07-16",
    "ptoDate": null,
    "notes": "",
    "type": "Optimizers & Inverters",
    "location": {
      "country": "United States",
      "state": "Minnesota",
      "city": "Saint Paul",
      "address": "123 Fake St",
      "address2": "",
      "zip": "55128",
      "timeZone": "America/Chicago",
      "countryCode": "US",
      "stateCode": "MN"
    },
    "primaryModule": {
      "manufacturerName": "Hanwha Q-Cells",
      "modelName": "325",
      "maximumPower": 325.0
    },
    "uris": {
      "DETAILS": "/site/1195480/details",
      "DATA_PERIOD": "/site/1195480/dataPeriod",
      "OVERVIEW": "/site/1195480/overview"
    },
    "publicSettings": {
      "isPublic": false
    }
  }
}

const mockWattTimeData = [
  {
    "point_time": "2022-08-26T04:55:00.000Z",
    "value": 1607.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:50:00.000Z",
    "value": 1607.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:45:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:40:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:35:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:30:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:25:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:20:00.000Z",
    "value": 1608.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:15:00.000Z",
    "value": 1601.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:10:00.000Z",
    "value": 1602.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:05:00.000Z",
    "value": 1590.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T04:00:00.000Z",
    "value": 1590.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:55:00.000Z",
    "value": 1589.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:50:00.000Z",
    "value": 1589.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:45:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:40:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:35:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:30:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:25:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:20:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:15:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:10:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:05:00.000Z",
    "value": 1574.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T03:00:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:55:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:50:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:45:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:40:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:35:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:30:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:25:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:20:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:15:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:10:00.000Z",
    "value": 1579.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:05:00.000Z",
    "value": 1586.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T02:00:00.000Z",
    "value": 1574.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:55:00.000Z",
    "value": 1578.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:50:00.000Z",
    "value": 1578.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:45:00.000Z",
    "value": 1578.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:40:00.000Z",
    "value": 1578.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:35:00.000Z",
    "value": 1653.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:30:00.000Z",
    "value": 1653.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:25:00.000Z",
    "value": 1650.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:20:00.000Z",
    "value": 1653.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:15:00.000Z",
    "value": 1653.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:10:00.000Z",
    "value": 1650.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:05:00.000Z",
    "value": 1650.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T01:00:00.000Z",
    "value": 1650.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:55:00.000Z",
    "value": 1647.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:50:00.000Z",
    "value": 1647.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:45:00.000Z",
    "value": 1647.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:40:00.000Z",
    "value": 1647.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:35:00.000Z",
    "value": 1647.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:30:00.000Z",
    "value": 1647.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:25:00.000Z",
    "value": 1647.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:20:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:15:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:10:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:05:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-26T00:00:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:55:00.000Z",
    "value": 1627.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:50:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:45:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:40:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:35:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:30:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:25:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:20:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:15:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:10:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:05:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T23:00:00.000Z",
    "value": 1620.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:55:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:50:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:45:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:40:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:35:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:30:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:25:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:20:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:15:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:10:00.000Z",
    "value": 1588.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:05:00.000Z",
    "value": 1589.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T22:00:00.000Z",
    "value": 1589.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:55:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:50:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:45:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:40:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:35:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:30:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:25:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:20:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:15:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:10:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:05:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T21:00:00.000Z",
    "value": 1634.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:55:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:50:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:45:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:40:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:35:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:30:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:25:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:20:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:15:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:10:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:05:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T20:00:00.000Z",
    "value": 1651.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:55:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:50:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:45:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:40:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:35:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:30:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:25:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:20:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:15:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:10:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:05:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T19:00:00.000Z",
    "value": 1646.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:55:00.000Z",
    "value": 1642.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:50:00.000Z",
    "value": 1642.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:45:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:40:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:35:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:30:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:25:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:20:00.000Z",
    "value": 1643.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:15:00.000Z",
    "value": 1648.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:10:00.000Z",
    "value": 1648.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:05:00.000Z",
    "value": 1648.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T18:00:00.000Z",
    "value": 1648.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:55:00.000Z",
    "value": 1637.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:50:00.000Z",
    "value": 1637.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:45:00.000Z",
    "value": 1637.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:40:00.000Z",
    "value": 1637.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:35:00.000Z",
    "value": 1637.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:30:00.000Z",
    "value": 1637.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:25:00.000Z",
    "value": 1637.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:20:00.000Z",
    "value": 1641.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:15:00.000Z",
    "value": 1559.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:10:00.000Z",
    "value": 1559.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:05:00.000Z",
    "value": 1559.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T17:00:00.000Z",
    "value": 1559.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:55:00.000Z",
    "value": 1551.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:50:00.000Z",
    "value": 1551.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:45:00.000Z",
    "value": 1551.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:40:00.000Z",
    "value": 1551.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:35:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:30:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:25:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:20:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:15:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:10:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:05:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T16:00:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:55:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:50:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:45:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:40:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:35:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:30:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:25:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:20:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:15:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:10:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:05:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T15:00:00.000Z",
    "value": 1596.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:55:00.000Z",
    "value": 1560.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:50:00.000Z",
    "value": 1560.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:45:00.000Z",
    "value": 1560.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:40:00.000Z",
    "value": 1548.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:35:00.000Z",
    "value": 1573.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:30:00.000Z",
    "value": 1573.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:25:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:20:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:15:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:10:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:05:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T14:00:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:55:00.000Z",
    "value": 1607.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:50:00.000Z",
    "value": 1607.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:45:00.000Z",
    "value": 1607.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:40:00.000Z",
    "value": 1591.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:35:00.000Z",
    "value": 1591.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:30:00.000Z",
    "value": 1591.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:25:00.000Z",
    "value": 1591.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:20:00.000Z",
    "value": 1589.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:15:00.000Z",
    "value": 1589.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:10:00.000Z",
    "value": 1590.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:05:00.000Z",
    "value": 1590.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T13:00:00.000Z",
    "value": 1590.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:55:00.000Z",
    "value": 1587.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:50:00.000Z",
    "value": 1587.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:45:00.000Z",
    "value": 1593.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:40:00.000Z",
    "value": 1593.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:35:00.000Z",
    "value": 1593.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:30:00.000Z",
    "value": 1599.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:25:00.000Z",
    "value": 1597.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:20:00.000Z",
    "value": 1597.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:15:00.000Z",
    "value": 1597.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:10:00.000Z",
    "value": 1604.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:05:00.000Z",
    "value": 1604.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T12:00:00.000Z",
    "value": 1604.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:55:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:50:00.000Z",
    "value": 1605.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:45:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:40:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:35:00.000Z",
    "value": 1606.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:30:00.000Z",
    "value": 1597.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:25:00.000Z",
    "value": 1597.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:20:00.000Z",
    "value": 1597.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:15:00.000Z",
    "value": 1584.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:10:00.000Z",
    "value": 1556.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:05:00.000Z",
    "value": 1574.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T11:00:00.000Z",
    "value": 1573.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:55:00.000Z",
    "value": 1573.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:50:00.000Z",
    "value": 1573.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:45:00.000Z",
    "value": 1573.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:40:00.000Z",
    "value": 1568.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:35:00.000Z",
    "value": 1568.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:30:00.000Z",
    "value": 1568.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:25:00.000Z",
    "value": 1568.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:20:00.000Z",
    "value": 1561.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:15:00.000Z",
    "value": 1561.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:10:00.000Z",
    "value": 1561.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:05:00.000Z",
    "value": 1561.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T10:00:00.000Z",
    "value": 1561.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:55:00.000Z",
    "value": 1528.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:50:00.000Z",
    "value": 1528.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:45:00.000Z",
    "value": 1528.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:40:00.000Z",
    "value": 1528.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:35:00.000Z",
    "value": 1528.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:30:00.000Z",
    "value": 1522.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:25:00.000Z",
    "value": 1522.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:20:00.000Z",
    "value": 1522.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:15:00.000Z",
    "value": 1522.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:10:00.000Z",
    "value": 1522.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:05:00.000Z",
    "value": 1522.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T09:00:00.000Z",
    "value": 1521.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:55:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:50:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:45:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:40:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:35:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:30:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:25:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:20:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:15:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:10:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:05:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T08:00:00.000Z",
    "value": 1504.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:55:00.000Z",
    "value": 1524.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:50:00.000Z",
    "value": 1524.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:45:00.000Z",
    "value": 1524.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:40:00.000Z",
    "value": 1524.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:35:00.000Z",
    "value": 1524.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:30:00.000Z",
    "value": 1553.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:25:00.000Z",
    "value": 1553.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:20:00.000Z",
    "value": 1553.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:15:00.000Z",
    "value": 1553.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:10:00.000Z",
    "value": 1553.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:05:00.000Z",
    "value": 1553.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T07:00:00.000Z",
    "value": 1561.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:55:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:50:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:45:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:40:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:35:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:30:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:25:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:20:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:15:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:10:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:05:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T06:00:00.000Z",
    "value": 1572.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:55:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:50:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:45:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:40:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:35:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:30:00.000Z",
    "value": 1564.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:25:00.000Z",
    "value": 1563.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:20:00.000Z",
    "value": 1591.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:15:00.000Z",
    "value": 1591.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:10:00.000Z",
    "value": 1591.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:05:00.000Z",
    "value": 1601.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  },
  {
    "point_time": "2022-08-25T05:00:00.000Z",
    "value": 1609.0,
    "frequency": 300,
    "market": "RTM",
    "ba": "MISO_MINNEAPOLIS",
    "datatype": "MOER",
    "version": "3.0"
  }
]

const mockInverter = {"energy":{"timeUnit":"HOUR","unit":"Wh","measuredBy":"INVERTER","values":[{"date":"2022-08-25 00:00:00","value":null},{"date":"2022-08-25 01:00:00","value":null},{"date":"2022-08-25 02:00:00","value":null},{"date":"2022-08-25 03:00:00","value":null},{"date":"2022-08-25 04:00:00","value":null},{"date":"2022-08-25 05:00:00","value":null},{"date":"2022-08-25 06:00:00","value":25},{"date":"2022-08-25 07:00:00","value":304},{"date":"2022-08-25 08:00:00","value":979},{"date":"2022-08-25 09:00:00","value":3030},{"date":"2022-08-25 10:00:00","value":5475},{"date":"2022-08-25 11:00:00","value":7075},{"date":"2022-08-25 12:00:00","value":7651},{"date":"2022-08-25 13:00:00","value":7625},{"date":"2022-08-25 14:00:00","value":7211},{"date":"2022-08-25 15:00:00","value":6352},{"date":"2022-08-25 16:00:00","value":5217},{"date":"2022-08-25 17:00:00","value":3565},{"date":"2022-08-25 18:00:00","value":1667},{"date":"2022-08-25 19:00:00","value":326},{"date":"2022-08-25 20:00:00","value":39},{"date":"2022-08-25 21:00:00","value":null},{"date":"2022-08-25 22:00:00","value":0},{"date":"2022-08-25 23:00:00","value":null}]}}

export {
  mockTimezone,
  mockWattTimeData,
  mockInverter
}