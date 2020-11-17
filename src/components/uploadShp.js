import React from 'react'
import * as shapefile from 'shapefile'

function UploadShp(props) {
    const handleChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = function(e) {
            const result = e.target.result
            shapefile.read(result).then((res) => {
                console.log(res)
                const features = res.features
                const newData = []
                features.forEach((data, index) => {
                    data.geometry.coordinates.forEach((secData, index) => {
                        secData.forEach(thirdData => {
                            thirdData.forEach(forthData => {
                                newData.push({lat: forthData[0], lng: forthData[1]})
                            })
                        })
                    })
                })
                console.log(newData)
                // 数据量太大了 过滤一部分
                props.updatePlaces(2, newData.slice(0, 200))
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    return (
        <form>
            <input 
                type="file"
                onChange={handleChange}
                >
            </input>
        </form>
    )
}

export default UploadShp