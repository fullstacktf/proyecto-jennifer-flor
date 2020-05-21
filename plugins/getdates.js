// import axios from 'axios'

// export default () => {
//   const arrayDates = []
//   axios
//     .get(`https://garageme-backend.herokuapp.com/bookingData?garageId=1`)
//     .then((res) => {
//       console.log(res.data)
//       Array.from(res.data).forEach((val) => {
//         getDatesBetweenDates(val.startDate, val.endDate).forEach((val) => {
//           arrayDates.push(val)
//         })
//       })
//       console.log(arrayDates)
//     })
//     .catch((e) => {
//       console.error(e)
//     })

const getDatesBetweenDates = (startDate, endDate) => {
  let dates = []

  startDate = new Date(startDate)
  endDate = new Date(endDate)
  startDate.setDate(startDate.getDate() + 1)
  // eslint-disable-next-line no-unmodified-loop-condition
  while (startDate < endDate) {
    dates = [...dates, new Date(startDate).toISOString().substr(0, 10)]
    startDate.setDate(startDate.getDate() + 1)
  }
  return Array.from(dates)
}
export default { getDatesBetweenDates }
