export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    const respData = {
      data: {
        token: "",
      },
    };
    const respDataJson = JSON.stringify(respData);
    const resp = {
      ok: true,
      status: 200,
      body: respDataJson,
      json: () => {
        return new Promise((resolve, reject) => {
          try {
            const value = JSON.parse(respDataJson);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      },
    };

    // simulate network delay
    setTimeout(() => {
      resolve(resp);
    }, 2000);
  });
}
export const loginBadRequest = (username, password) => {
  return new Promise((resolve, reject) => {
    const respData = {
      code: 888,
      message: "Invalid username/password",
    };
    const respDataJson = JSON.stringify(respData);
    const resp = {
      ok: false,
      status: 400,
      body: respDataJson,
      json: () => {
        return new Promise((resolve, reject) => {
          try {
            const value = JSON.parse(respDataJson);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      },
    };

    // simulate network delay
    setTimeout(() => {
      resolve(resp);
    }, 2000);
  });
}

export const logout = () => {
  return new Promise((resolve, reject) => {
    const respData = {
      data: null,
    };
    const respDataJson = JSON.stringify(respData);
    const resp = {
      ok: true,
      status: 200,
      body: respDataJson,
      json: () => {
        return new Promise((resolve, reject) => {
          try {
            const value = JSON.parse(respDataJson);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      },
    };

    // simulate network delay
    setTimeout(() => {
      resolve(resp);
    }, 2000);
  });
}

const mockMarkers = {
  "10km" : [
    {
      id: 'marker1',
      latitude: 43.649879, 
      longitude: -79.389309,
      title: 'Marker 1',
      description: 'Description 1', 
    },
    {
      id: 'marker2',
      latitude: 43.650865, 
      longitude: -79.384771,
      title: 'Marker 2',
      description: 'Description 2', 
    },
  ],
  "20km" : [
    {
      id: 'marker1',
      latitude: 43.649879, 
      longitude: -79.389309,
      title: 'Marker 1',
      description: 'Description 1', 
    },
    {
      id: 'marker2',
      latitude: 43.650865, 
      longitude: -79.384771,
      title: 'Marker 2',
      description: 'Description 2', 
    },
    {
      id: 'marker3',
      latitude: 43.654839, 
      longitude: -79.408804,
      title: 'Marker 2',
      description: 'Description 2', 
    },
  ],
  "30km" : [
    {
      id: 'marker1',
      latitude: 43.649879, 
      longitude: -79.389309,
      title: 'Marker 1',
      description: 'Description 1', 
    },
    {
      id: 'marker2',
      latitude: 43.650865, 
      longitude: -79.384771,
      title: 'Marker 2',
      description: 'Description 2', 
    },
    {
      id: 'marker3',
      latitude: 43.654839, 
      longitude: -79.408804,
      title: 'Marker 3',
      description: 'Description 3', 
    },
    {
      id: 'marker4',
      latitude: 43.661794,
      longitude: -79.388205,
      title: 'Marker 4',
      description: 'Description 4', 
    },
  ],
  "40km" : [
    {
      id: 'marker1',
      latitude: 43.649879, 
      longitude: -79.389309,
      title: 'Marker 1',
      description: 'Description 1', 
    },
    {
      id: 'marker2',
      latitude: 43.650865, 
      longitude: -79.384771,
      title: 'Marker 2',
      description: 'Description 2', 
    },
    {
      id: 'marker3',
      latitude: 43.654839, 
      longitude: -79.408804,
      title: 'Marker 3',
      description: 'Description 3', 
    },
    {
      id: 'marker4',
      latitude: 43.661794,
      longitude: -79.388205,
      title: 'Marker 4',
      description: 'Description 4', 
    },
    {
      id: 'marker5',
      latitude: 43.660800,
      longitude: -79.517294,
      title: 'Marker 5',
      description: 'Description 5', 
    },
  ],
  "50km" : [
    {
      id: 'marker1',
      latitude: 43.649879, 
      longitude: -79.389309,
      title: 'Marker 1',
      description: 'Description 1', 
    },
    {
      id: 'marker2',
      latitude: 43.650865, 
      longitude: -79.384771,
      title: 'Marker 2',
      description: 'Description 2', 
    },
    {
      id: 'marker3',
      latitude: 43.654839, 
      longitude: -79.408804,
      title: 'Marker 3',
      description: 'Description 3', 
    },
    {
      id: 'marker4',
      latitude: 43.661794,
      longitude: -79.388205,
      title: 'Marker 4',
      description: 'Description 4', 
    },
    {
      id: 'marker5',
      latitude: 43.660800,
      longitude: -79.517294,
      title: 'Marker 5',
      description: 'Description 5', 
    },
    {
      id: 'marker6',
      latitude: 43.803693,
      longitude: -79.447256,
      title: 'Marker 6',
      description: 'Description 6', 
    },
  ],
  "60km" : [
    {
      id: 'marker1',
      latitude: 43.649879, 
      longitude: -79.389309,
      title: 'Marker 1',
      description: 'Description 1', 
    },
    {
      id: 'marker2',
      latitude: 43.650865, 
      longitude: -79.384771,
      title: 'Marker 2',
      description: 'Description 2', 
    },
    {
      id: 'marker3',
      latitude: 43.654839, 
      longitude: -79.408804,
      title: 'Marker 3',
      description: 'Description 3', 
    },
    {
      id: 'marker4',
      latitude: 43.661794,
      longitude: -79.388205,
      title: 'Marker 4',
      description: 'Description 4', 
    },
    {
      id: 'marker5',
      latitude: 43.660800,
      longitude: -79.517294,
      title: 'Marker 5',
      description: 'Description 5', 
    },
    {
      id: 'marker6',
      latitude: 43.803693,
      longitude: -79.447256,
      title: 'Marker 6',
      description: 'Description 6', 
    },
    {
      id: 'marker7',
      latitude: 43.826484,
      longitude: -79.139639,
      title: 'Marker 7',
      description: 'Description 7', 
    },
  ],
  "100km" : [
    {
      id: 'marker1',
      latitude: 43.649879, 
      longitude: -79.389309,
      title: 'Marker 1',
      description: 'Description 1', 
    },
    {
      id: 'marker2',
      latitude: 43.650865, 
      longitude: -79.384771,
      title: 'Marker 2',
      description: 'Description 2', 
    },
    {
      id: 'marker3',
      latitude: 43.654839, 
      longitude: -79.408804,
      title: 'Marker 3',
      description: 'Description 3', 
    },
    {
      id: 'marker4',
      latitude: 43.661794,
      longitude: -79.388205,
      title: 'Marker 4',
      description: 'Description 4', 
    },
    {
      id: 'marker5',
      latitude: 43.660800,
      longitude: -79.517294,
      title: 'Marker 5',
      description: 'Description 5', 
    },
    {
      id: 'marker6',
      latitude: 43.803693,
      longitude: -79.447256,
      title: 'Marker 6',
      description: 'Description 6', 
    },
    {
      id: 'marker8',
      latitude: 43.510595,
      longitude: -79.706808,
      title: 'Marker 8',
      description: 'Description 8', 
    },
  ],
};

export const getMarkers = (radius, radiusUnit) => {
  return new Promise((resolve, reject) => {
    const respData = {
      data: mockMarkers[radius.toString() + radiusUnit],
    };
    const respDataJson = JSON.stringify(respData);
    const resp = {
      ok: true,
      status: 200,
      body: respDataJson,
      json: () => {
        return new Promise((resolve, reject) => {
          try {
            const value = JSON.parse(respDataJson);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      },
    };

    // simulate network delay
    setTimeout(() => {
      resolve(resp);
    }, 2000);
  });
}
