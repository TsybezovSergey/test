interface ApiResponse {
  data: string;
}

export function mockApiCall(): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error('Server error: something went wrong (500)'));
      } else {
        resolve({ data: 'Success! Here is your response.' });
      }
    }, 2000);
  });
}
