/* eslint-disable no-underscore-dangle,no-param-reassign,no-undef */
export default function registerControlPosition(map, positionName) {
  if (!map._controlPositions[positionName]) {
    const container = document.createElement('div')
    container.className = `mapboxgl-ctrl-${positionName}`
    map._controlContainer.appendChild(container)
    map._controlPositions[positionName] = container
  }
}
