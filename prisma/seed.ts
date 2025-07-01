import addUser from './seeders/user';

const main = async () => {
  await addUser();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {});
main().then(() => {
  console.log('Seeding completed successfully.');
});