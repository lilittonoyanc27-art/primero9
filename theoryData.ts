import { TheorySection } from './types.ts';

export const theorySections: TheorySection[] = [
  {
    id: 1,
    titleEs: '1. El significado de las palabras',
    titleHy: '1. Բառերի իմաստը',
    tag: 'Significado / Իմաստ',
    explanationEs: 'Las palabras tienen un significado, es decir, expresan una idea, un objeto, una acción, una cualidad, etc.',
    explanationHy: 'Բառերն ունեն իմաստ, այսինքն՝ արտահայտում են որևէ գաղափար, առարկա, գործողություն, հատկանիշ և այլն։',
    examples: [
      {
        es: 'mesa → mueble con una superficie y patas.',
        hy: 'mesa → սեղան (կահույք՝ մակերեսով և ոտքերով)։',
      },
      {
        es: 'correr → desplazarse rápidamente.',
        hy: 'correr → վազել (արագ տեղաշարժվել)։',
      },
    ],
    noteEs: 'El significado permite comunicarnos y entender la realidad que nos rodea.',
    noteHy: 'Իմաստը մեզ հնարավորություն է տալիս հաղորդակցվել և հասկանալ մեզ շրջապատող իրականությունը։',
  },
  {
    id: 2,
    titleEs: '2. Palabras monosémicas',
    titleHy: '2. Մենիմաստ բառեր',
    tag: 'Monosemia / Մենիմաստություն',
    explanationEs: 'Una palabra monosémica tiene normalmente un solo significado.',
    explanationHy: 'Մենիմաստ բառը սովորաբար ունի մեկ իմաստ։',
    examples: [
      {
        es: 'termómetro → instrumento para medir la temperatura.',
        hy: 'termómetro → ջերմաչափ (ջերմաստիճանը չափելու գործիք)։',
      },
      {
        es: 'triángulo → figura geométrica de tres lados.',
        hy: 'triángulo → եռանկյուն (երեք կողմ ունեցող երկրաչափական պատկեր)։',
      },
      {
        es: 'oxígeno → elemento químico esencial para la respiración.',
        hy: 'oxígeno → թթվածին (շնչառության համար կարևոր քիմիական տարր)։',
      },
    ],
    noteEs: 'Muchas palabras científicas y técnicas son monosémicas para evitar confusiones.',
    noteHy: 'Շատ գիտական և տեխնիկական բառեր մենիմաստ են՝ շփոթմունքից խուսափելու համար։',
  },
  {
    id: 3,
    titleEs: '3. Palabras polisémicas',
    titleHy: '3. Բազմիմաստ բառեր',
    tag: 'Polisemia / Բազմիմաստություն',
    explanationEs: 'Una palabra polisémica tiene varios significados relacionados entre sí. La misma palabra tiene distintos significados según el contexto.',
    explanationHy: 'Բազմիմաստ բառը ունի մի քանի իրար հետ կապված իմաստներ։ Նույն բառը տարբեր իրավիճակներում տարբեր իմաստներ ունի։',
    examples: [
      {
        es: 'Me senté en un banco. (banco = asiento)',
        hy: 'Ես նստեցի նստարանին։ (banco = նստարան)',
        subEs: 'Significado 1: Asiento largo para sentarse en el parque o la calle.',
        subHy: 'Իմաստ 1՝ Նստարան՝ այգում կամ փողոցում նստելու համար։',
      },
      {
        es: 'Fui al banco a sacar dinero. (banco = entidad financiera)',
        hy: 'Ես գնացի բանկ՝ գումար հանելու։ (banco = բանկ, ֆինանսական կազմակերպություն)',
        subEs: 'Significado 2: Empresa o institución que custodia y presta dinero.',
        subHy: 'Իմաստ 2՝ Ընկերություն կամ հիմնարկ, որը պահում և տրամադրում է դրամ։',
      },
      {
        es: 'El gato está debajo de la mesa. / Necesitamos un gato para el coche.',
        hy: 'Կատուն սեղանի տակ է։ / Մեքենայի համար դոմկրատ (gato) է պետք։',
        subEs: 'gato = animal felino / herramienta para levantar vehículos.',
        subHy: 'gato = կատու (կենդանի) / ամբարձիկ, դոմկրատ (մեքենան բարձրացնելու գործիք)։',
      },
      {
        es: 'hoja de un árbol / hoja de papel',
        hy: 'ծառի տերև / թղթի թերթ (էջ)',
        subEs: 'hoja = parte vegetal del árbol / trozo de papel fino para escribir.',
        subHy: 'hoja = ծառի տերև / թուղթ, գրելու թերթ։',
      },
    ],
    noteEs: '¿Qué nos ayuda a elegir el significado correcto? El contexto de la oración.',
    noteHy: 'Ի՞նչն է օգնում որոշել ճիշտ իմաստը։ Նախադասության համատեքստը (contexto)։',
  },
  {
    id: 4,
    titleEs: '4. Sinónimos',
    titleHy: '4. Հոմանիշներ',
    tag: 'Sinonimia / Հոմանիշություն',
    explanationEs: 'Los sinónimos son palabras que tienen un significado igual o muy parecido.',
    explanationHy: 'Հոմանիշները նույն կամ մոտ իմաստ ունեցող բառեր են։',
    examples: [
      {
        es: 'feliz – contento',
        hy: 'ուրախ – գոհ / ուրախ',
      },
      {
        es: 'rápido – veloz',
        hy: 'արագ – սրընթաց',
      },
      {
        es: 'bonito – hermoso',
        hy: 'գեղեցիկ – հիասքանչ',
      },
      {
        es: 'empezar – comenzar',
        hy: 'սկսել – սկսել',
      },
      {
        es: 'difícil – complicado',
        hy: 'դժվար – բարդ',
      },
    ],
    noteEs: 'Atención: Dos palabras sinónimas no siempre son intercambiables en todos los contextos.',
    noteHy: 'Ուշադրություն․ Հոմանիշները ոչ միշտ են լիովին փոխարինելի բոլոր իրավիճակներում։',
  },
  {
    id: 5,
    titleEs: '5. Antónimos',
    titleHy: '5. Հականիշներ',
    tag: 'Antonimia / Հականիշություն',
    explanationEs: 'Los antónimos son palabras de significado contrario u opuesto.',
    explanationHy: 'Հականիշները հակառակ կամ հակադիր իմաստ ունեցող բառեր են։',
    examples: [
      {
        es: 'grande – pequeño',
        hy: 'մեծ – փոքր',
      },
      {
        es: 'entrar – salir',
        hy: 'մտնել – դուրս գալ',
      },
      {
        es: 'fácil – difícil',
        hy: 'հեշտ – դժվար',
      },
      {
        es: 'subir – bajar',
        hy: 'բարձրանալ – իջնել',
      },
      {
        es: 'cerca – lejos',
        hy: 'մոտ – հեռու',
      },
      {
        es: 'encender – apagar',
        hy: 'միացնել (վառել) – անջատել (մարել)',
      },
      {
        es: 'lleno – vacío',
        hy: 'լիքը – դատարկ',
      },
    ],
    noteEs: 'Los antónimos nos permiten contrastar cualidades, direcciones y estados.',
    noteHy: 'Հականիշները թույլ են տալիս հակադրել հատկանիշներ, ուղղություններ և վիճակներ։',
  },
  {
    id: 6,
    titleEs: '6. Palabras homónimas',
    titleHy: '6. Համանուն բառեր',
    tag: 'Homonimia / Համանունություն',
    explanationEs: 'Las palabras homónimas tienen la misma forma o el mismo sonido, pero significados diferentes y no relacionados entre sí por su origen.',
    explanationHy: 'Համանուն բառերը կարող են նույն ձևը կամ հնչողությունն ունենալ, բայց ունեն տարբեր, իրար հետ չկապված իմաստներ։',
    examples: [
      {
        es: 'Juan vino ayer. (vino = verbo venir)',
        hy: 'Խուանը երեկ եկավ։ (vino = գալ բայի անցյալ ձևը)',
        subEs: 'Forma del pretérito perfecto simple del verbo venir.',
        subHy: 'Գալ (venir) բայի անցյալ կատարյալ ժամանակաձևը։',
      },
      {
        es: 'Bebieron vino. (vino = bebida alcohólica de uva)',
        hy: 'Նրանք գինի խմեցին։ (vino = գինի, խաղողի ըմպելիք)',
        subEs: 'Sustantivo: bebida fermentada de zumo de uva.',
        subHy: 'Գոյական՝ խաղողից պատրաստված ալկոհոլային ըմպելիք։',
      },
    ],
    noteEs: 'Diferencia clave con la polisemia: las homónimas no comparten origen ni parentesco semántico.',
    noteHy: 'Գլխավոր տարբերությունը բազմիմաստությունից. համանուն բառերը չունեն ընդհանուր ծագում կամ իմաստային կապ։',
  },
  {
    id: 7,
    titleEs: '7. Campo semántico',
    titleHy: '7. Իմաստային դաշտ',
    tag: 'Campo Semántico / Իմաստային դաշտ',
    explanationEs: 'Un campo semántico es un conjunto de palabras relacionadas por su significado (pertenecen a la misma categoría o tema).',
    explanationHy: 'Իմաստային դաշտը իմաստով իրար հետ կապված բառերի խումբ է (պատկանում են նույն թեմային կամ կարգին)։',
    examples: [
      {
        es: 'fútbol, baloncesto, tenis, natación → campo semántico de los deportes',
        hy: 'ֆուտբոլ, բասկետբոլ, թենիս, լող → սպորտի (մարզաձևերի) իմաստային դաշտ',
      },
      {
        es: 'rojo, azul, verde, amarillo → campo semántico de los colores',
        hy: 'կարմիր, կապույտ, կանաչ, դեղին → գույների իմաստային դաշտ',
      },
      {
        es: 'padre, madre, hermano, abuelo → campo semántico de la familia',
        hy: 'հայր, մայր, եղբայր, պապիկ → ընտանիքի իմաստային դաշտ',
      },
      {
        es: 'avión, tren, autobús, bicicleta → medios de transporte',
        hy: 'ինքնաթիռ, գնացք, ավտոբուս, հեծանիվ → տրանսպորտային միջոցներ',
      },
    ],
    noteEs: 'Las palabras de un campo semántico no necesitan tener la misma raíz.',
    noteHy: 'Իմաստային դաշտի բառերը պարտադիր չէ, որ ունենան նույն արմատը։',
  },
  {
    id: 8,
    titleEs: '8. Familia léxica (¡No confundir con campo semántico!)',
    titleHy: '8. Բառակազմական ընտանիք (Չշփոթե՛լ իմաստային դաշտի հետ)',
    tag: 'Familia Léxica / Բառակազմական ընտանիք',
    explanationEs: 'Una familia léxica está formada por palabras que comparten la misma raíz (lexema).',
    explanationHy: 'Բառակազմական ընտանիքը կազմված է նույն արմատն ունեցող բառերից։',
    examples: [
      {
        es: 'pan – panadero – panadería – empanar (raíz: pan-)',
        hy: 'pan (հաց) – panadero (հացթուխ) – panadería (հացատուն/փուռ) (արմատ՝ pan-)',
      },
      {
        es: 'flor – florero – florista – florecer (raíz: flor-)',
        hy: 'flor (ծաղիկ) – florero (ծաղկաման) – florista (ծաղկավաճառ) – florecer (ծաղկել) (արմատ՝ flor-)',
      },
      {
        es: 'mar – marinero – marítimo – marea (raíz: mar-)',
        hy: 'mar (ծով) – marinero (նավաստի) – marítimo (ծովային) (արմատ՝ mar-)',
      },
    ],
    comparison: {
      item1Es: 'Campo semántico',
      desc1Es: 'Palabras relacionadas por significado (concepto común, distintas raíces). Ej: fútbol, tenis, natación.',
      item1Hy: 'Իմաստային դաշտ',
      desc1Hy: 'Բառերը կապված են իմաստով (ընդհանուր հասկացություն, բայց տարբեր արմատներ)։ Օրինակ՝ ֆուտբոլ, թենիս, լող։',
      item2Es: 'Familia léxica',
      desc2Es: 'Palabras con la misma raíz léxica. Ej: pan, panadero, panadería.',
      item2Hy: 'Բառակազմական ընտանիք',
      desc2Hy: 'Բառերն ունեն նույն արմատը։ Օրինակ՝ pan, panadero, panadería։',
    },
    noteEs: 'Truco de examen: busca si comparten las mismas letras de la raíz.',
    noteHy: 'Քննական հուշում. ստուգի՛ր, արդյոք բառերը պարունակում են նույն արմատի տառերը։',
  },
];
