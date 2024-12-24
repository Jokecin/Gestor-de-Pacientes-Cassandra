# Sistema de Gestión de Datos con Cassandra para Contextos Hospitalarios
*Tarea 3 - Sistemas Distribuidos*


## Descripción del Proyecto

Este proyecto implementa un sistema de gestión de datos utilizando Apache Cassandra, diseñado para manejar eficazmente grandes volúmenes de información en un contexto hospitalario. Utiliza Docker para facilitar la configuración y el despliegue del entorno de Cassandra y una API REST para interactuar con la base de datos.

## Integrantes

- Matías Araya
- Javier Romo

## Estructura del Proyecto

- `Cassandra/`: Contiene los scripts y configuraciones específicas para la base de datos Cassandra y la API.
- `docker-compose.yaml`: Define los servicios, configuraciones y volúmenes necesarios para el despliegue del sistema usando Docker.

## Comandos para Iniciar el Proyecto

Clonar el repositorio:
```bash
git clone "https://github.com/joke1317/Tarea3SD"
```

Levantar el sistema con Docker Compose:
```bash
docker-compose up -d
```

## Uso del Sistema

Una vez desplegado el sistema, se puede acceder a la interfaz de Cassandra a través de su API en el puerto `3000` para realizar las siguientes operaciones:

### Tipos de Operaciones

- **Crear (`POST /create`)**: Inserta un nuevo paciente y una receta asociada si el paciente no existe previamente.
- **Editar (`POST /edit`)**: Actualiza una receta existente con nueva información.
- **Eliminar (`POST /delete`)**: Elimina una receta existente.

Estas operaciones permiten gestionar los datos de pacientes y recetas en el sistema de manera eficiente y segura.

## Preguntas y Respuestas sobre la Arquitectura y Datos

1. **¿Cómo se maneja la arquitectura en Cassandra y cómo se conectan los nodos al crear un cluster?**
   - Apache Cassandra utiliza una arquitectura distribuida sin puntos únicos de falla. Los nodos en un clúster de Cassandra operan en un modelo peer-to-peer en lugar de un modelo maestro-esclavo. Cuando se crea un clúster, cada nodo se comunica con otros nodos utilizando el protocolo Gossip para intercambiar información de estado sobre sí mismos y otros nodos en un clúster de forma periódica y asincrónica. Esta arquitectura permite una alta disponibilidad y tolerancia a fallos, asegurando que no haya interrupciones en el servicio incluso si un nodo falla.

2. **¿Cuáles son las estrategias de replicación en Cassandra y cuál es su ventaja?**
   - Cassandra ofrece dos principales estrategias de replicación: `SimpleStrategy` y `NetworkTopologyStrategy`. `SimpleStrategy` se utiliza para ambientes de desarrollo o en clústeres de un solo datacenter, donde replica los datos en múltiples nodos dentro del mismo datacenter. Por otro lado, `NetworkTopologyStrategy` se emplea en entornos de producción o en clústeres con múltiples datacenters, donde permite configurar la replicación de datos de manera más granular a través de datacenters, lo que mejora significativamente la disponibilidad y resistencia del sistema en geografías múltiples.

3. **¿La solución propuesta es adecuada para el contexto? ¿Qué mejoras se podrían implementar?**
   - La solución propuesta es adecuada dado que Cassandra es altamente escalable y se maneja bien bajo grandes volúmenes de lectura y escritura, lo cual es típico en un contexto hospitalario con altos requerimientos de disponibilidad y acceso rápido a datos críticos. Para mejorar aún más, se podría considerar el uso de técnicas avanzadas como la compresión de datos, la utilización de cachés de consulta y la optimización de las consultas CQL para reducir la latencia y aumentar el rendimiento. Además, implementar un monitoreo y alertas proactivas sobre la salud del clúster y el rendimiento ayudaría a mantener la estabilidad y prevenir posibles fallos.

## Contribuciones y Mejoras

Este proyecto es abierto a contribuciones. Las sugerencias de mejoras, reporte de errores y pull requests son bienvenidos.
