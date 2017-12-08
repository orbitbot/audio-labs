
export const record = () => {
  navigator.mediaDevices.getUserMedia({ audio : true })
    .then((stream) => {
      console.log('got stream', stream)
    })
    .catch(console.error.bind(console))
    // .catch((error) => {
    //   console.error(error)
    //   if (error.name = 'AbortError') {}
    //   if (error.name = 'NotAllowedError') {}
    //   if (error.name = 'NotFoundError') {}
    //   if (error.name = 'NotReadableError') {}
    //   if (error.name = 'OverConstrainedError') {}
    //   if (error.name = 'SecurityError') {}
    //   if (error.name = 'TypeError') {}
    // })

}
