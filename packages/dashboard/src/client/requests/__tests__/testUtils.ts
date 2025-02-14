// import { MockedProvider, MockedResponse } from '@apollo/client/testing';
// import { ReactElement } from 'react';
// import { render } from '@testing-library/react';


// // to test Apollo Client queries and mutations, we need a mock Apollo Client
// export const renderWithApollo = (
//   component: ReactElement,
//   mocks: MockedResponse[] = []
// ) => {
//   return render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       {component}
//     </MockedProvider>
//   );
// };

// // Example mock for a query
// export const createQueryMock = (query: any, mockData: any) => ({
//   request: {
//     query,
//   },
//   result: {
//     data: mockData,
//   },
// });