/* **** WRAPPER FUNCTIONS FOR ACCESSING ELASTICSEARCH **** */

import { Client } from '@elastic/elasticsearch';
import { config } from '@root/config';
import { appLogger } from '@utils/index';

//const esClient: Client = new Client({ node: config.esURL });
const esClient = new Client({
  auth: {
    password: config.elasticsearch.password,
    username: config.elasticsearch.username,
  },
  node: config.elasticsearch.url,
});

/* this is a paged search*/
export function search<T>(
  indexName: string,
  filters: any,
  notFilters: any,
  resultsCount: number,
  fromCount: number
): Promise<T> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      const query =
        !notFilters || notFilters === []
          ? { bool: { filter: filters } }
          : { bool: { filter: filters, must_not: notFilters } };

      esClient.search(
        {
          body: {
            from: fromCount,
            query,
            size: resultsCount,
          },
          index: indexName,
        },
        function (err, resp) {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }

          return resolve(resp.body.hit.hits);
        }
      );
    }
  );
}

export function searchAll<T>(
  indexName: string,
  filters: any,
  notFilters: any
): Promise<T> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      const query =
        !notFilters || notFilters === []
          ? { bool: { filter: filters } }
          : { bool: { filter: filters, must_not: notFilters } };

      // first we do a dummy search to find the data size
      esClient.search(
        {
          body: {
            from: 0,
            query,
            size: 1,
          },
          index: indexName,
        },
        function (err, resp) {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }

          const total = resp.body.hits.total.value;
          if (total === 0) {
            return resolve([]);
          }

          // then do a search for all the documents
          esClient.search(
            {
              body: {
                from: 0,
                query,
                size: total,
              },
              index: indexName,
            },
            function (err1, resp1) {
              if (err1) {
                appLogger.error(err1);
                return reject(err1);
              }

              return resolve(resp1.body.hits.hits);
            }
          );
        }
      );
    }
  );
}

export function searchAllCount(
  indexName: string,
  filters: any,
  notFilters: any
): Promise<number> {
  return new Promise(
    (resolve: (item: number) => void, reject: (err: any) => any): any => {
      const query =
        !notFilters || notFilters === []
          ? { bool: { filter: filters } }
          : { bool: { filter: filters, must_not: notFilters } };

      // first we do a dummy search to find the data size
      esClient.search(
        {
          body: {
            from: 0,
            query,
            size: 1,
          },
          index: indexName,
        },
        function (err, resp) {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }

          return resolve(resp.body.hits.total.value);
        }
      );
    }
  );
}

export function fetchAll<T>(indexName: string): Promise<T> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      // first we do a dummy search to find the data size
      esClient.search(
        {
          body: {
            from: 0,
            query: { match_all: {} },
            size: 1,
          },
          index: indexName,
        },
        function (err, resp) {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }

          const total = resp.body.hits.total.value;
          if (total === 0) {
            return resolve([]);
          }

          // then do a search for all the documents
          esClient.search(
            {
              body: {
                from: 0,
                query: { match_all: {} },
                size: total,
              },
              index: indexName,
            },
            function (err1, resp1) {
              if (err1) {
                appLogger.error(err1);
                return reject(err1);
              }

              return resolve(resp1.body.hits.hits);
            }
          );
        }
      );
    }
  );
}

export function fetchAllCount(indexName: string): Promise<number> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      // first we do a dummy search to find the data size
      esClient.search(
        {
          body: {
            from: 0,
            query: { match_all: {} },
            size: 1,
          },
          index: indexName,
        },
        function (err, resp) {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }

          return resolve(resp.body.hits.total.value);
        }
      );
    }
  );
}

export function fetchFields<T>(indexName: string, fields: any[]): Promise<T> {
  return new Promise(
    (resolve: (item: any) => void, reject: (err: any) => any): any => {
      // first we do a dummy search to find the data size
      esClient.search(
        {
          body: {
            _source: fields,
            from: 0,
            query: { match_all: {} },
            size: 1,
          },
          index: indexName,
        },
        function (err, resp) {
          if (err) {
            appLogger.error(err);
            return reject(err);
          }

          const total = resp.body.hits.total.value;
          if (total === 0) {
            return resolve([]);
          }

          // then do a search for all the documents
          esClient.search(
            {
              body: {
                _source: fields,
                from: 0,
                query: { match_all: {} },
                size: total,
              },
              index: indexName,
            },
            function (err1, resp1) {
              if (err1) {
                appLogger.error(err1);
                return reject(err1);
              }

              return resolve(resp1.body.hits.hits);
            }
          );
        }
      );
    }
  );
}
