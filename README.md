# Tarea3 SD

## Integrantes 


- Matías Araya
- Javier Romo


## Comandos 


- git clone "(https://github.com/joke1317/Tarea3SD)"
- docker-compose up -d



## Preguntas

1. Explique la arquitectura que Cassandra maneja. Cuando se crea el cluster ¿Como los nodos se conectan? 
¿Qué ocurre cuando un cliente realiza una petición a uno de los nodos? ¿Qué ocurre cuando uno de los nodos se desconecta? 
¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?

    La arquitectura empleada por Cassandra corresponde a la peer to peer conectado en forma de anillo de forma que se distribuyen los datos de una forma 
    homogénea con la ayuda de un balanceador de carga, haciendola tolerante a fallos, además estos nodos se comunican a través de sus vecinos mediante el uso 
    del protocolo Gossip. Cuando un cliente ejerce una petición a un nodo, este actúa como coordinador de dicha petición para poder ejecutarla 

2. 2-Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son estos? 
¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted para en el caso actual y por qué? Justifique 
apropiadamente su respuesta.

    La diferencia principal de ambas estrategias  es el número de data centers que se presentan en la estructura, estas estrategias
    se denominan como NetworkTopologyStrategy y SimpleStrategy.
    Con la primera estrategia se tiene multiples data centers, por lo cual se recomienda que su uso sea para sistemas 
    de gran embergadura y una gran cantidad de datos, cabe destacar además que estos data centers son creados de forma separada
    y en conjunto con replicas independientes asociadas a cada uno de estos data centers.
    Por otro lado se tiene SimpleStrategy que de forma contraria a la estrategia anterior esta tiene un solo data center y de
    él se desprenden multiples nodos en conjuntos con sus respectivos racks.
    Para el caso tratado en esta tarea se recomendaría el uso de SimpleStrategy dado que el sistema es de poca complejidad 
    y posee una cantidad de datos baja en comparación con grandes sistemas que existen en la actualidad.

3. Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? 
¿Qué ocurre cuando se quiere escalar en la solución? ¿Qué mejoras implementaria? 
Oriente su respuesta hacia el Sharding (la replicación/distribución de los datos) y comente una estrategia que 
podría seguir para ordenar los datos.

    La solución planteada si es la correcta dado que se tienen multiples nodos independientes que se comunican con una API REST
    para hacer el procesamiento, y tratandose de un contexto de hospital y que las consultas son relativamente 
    sencillas el uso de cassandra es apropiado. Para el tema de la escalabilidad las técnicas clásicas 
    (caché, particionamiento, replicación) funcionan de buena manera dado que cassandra es escalable tanto horizontal como 
    verticalmente, sin embargo para este caso en particular se debe hacer más enfoque en la replicación de los nodos dentro 
    del cluster haciendo replicas de cada nodo según su funcionalidad dando así una tolerancia a fallos al sistema y homogeneidad
    a los datos, tomando en cuenta que la estrategía que se recomendó para esta ocasión fue la de "SympleStrategy"
    
