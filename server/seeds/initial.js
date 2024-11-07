/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('articles').del();
  await knex('articles').insert([
    {
      title: 'Article 1 test',
      content:
        'Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor vitae felis facilisis augue natoque purus varius. Nulla cras ultricies euismod nullam ultrices ex litora. Gravida vestibulum amet lorem aliquam elit elementum aenean ac. Accumsan pharetra augue, morbi primis nunc laoreet molestie ultricies. Felis erat facilisis aenean nullam id gravida lectus scelerisque felis. Cras proin felis finibus class ultrices egestas. Aliquet sociosqu lacinia ex, nunc quam potenti aenean. Curabitur blandit in donec inceptos hendrerit. Rutrum fames maecenas; ornare nunc nec tortor semper. Leo dis aptent nam ultrices ligula velit torquent curabitur.',
    },
    {
      title: 'Article 2 test',
      content:
        'Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor vitae felis facilisis augue natoque purus varius. Nulla cras ultricies euismod nullam ultrices ex litora. Gravida vestibulum amet lorem aliquam elit elementum aenean ac. Accumsan pharetra augue, morbi primis nunc laoreet molestie ultricies. Felis erat facilisis aenean nullam id gravida lectus scelerisque felis. Cras proin felis finibus class ultrices egestas. Aliquet sociosqu lacinia ex, nunc quam potenti aenean. Curabitur blandit in donec inceptos hendrerit. Rutrum fames maecenas; ornare nunc nec tortor semper. Leo dis aptent nam ultrices ligula velit torquent curabitur.',
    },
    {
      title: 'Article 3 test',
      content:
        'Lorem ipsum odor amet, consectetuer adipiscing elit. Porttitor vitae felis facilisis augue natoque purus varius. Nulla cras ultricies euismod nullam ultrices ex litora. Gravida vestibulum amet lorem aliquam elit elementum aenean ac. Accumsan pharetra augue, morbi primis nunc laoreet molestie ultricies. Felis erat facilisis aenean nullam id gravida lectus scelerisque felis. Cras proin felis finibus class ultrices egestas. Aliquet sociosqu lacinia ex, nunc quam potenti aenean. Curabitur blandit in donec inceptos hendrerit. Rutrum fames maecenas; ornare nunc nec tortor semper. Leo dis aptent nam ultrices ligula velit torquent curabitur.',
    },
  ]);
};
