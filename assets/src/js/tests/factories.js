import faker from 'faker'

export function trackFactory() {
  return {
    artwork_url: faker.internet.url(),
    gateway_id: faker.random.number(),
    id: faker.random.number(),
    stream_url: faker.internet.url(),
    title: faker.lorem.sentence(),
    username: faker.internet.userName(),
  }
}

