Este proyecto es una plataforma dígital que permite a los usuarios seleccionar opciones para que se le recomienden una variedad de películas, series y videojuegos. Estos son los requerimientos:

1. La página principal debe tener un inicio de sesion y registro, estará disponible la opción de iniciar sesión con google..
2. Después del inicio de seión o registro se le muestra al usuario un directorio  donde puede escoger si es serie pelicula o vidoejuego y los géneros de su interés.
3. Habrán botones en la parte superior para navegar entre la opción Inicio, Películas, Series y Videojuegos, Perfil y Configuración.
4. Dentro de la sección Perfil se podrá cambiar nombre, cambiar foto de perfil, descripción, historial y logros desbloqueados.
5. Despues de marcar como completado una serie, pelicula o videojuego le aparecerá al usuario una opción para responder una pequeña trivia sobre el tema de la película, serie o videojuego, la trivia srá opcional, por lo que tendrá un botón de omitir en caso de no querer hacerla, también se le proporcionará datos curiosos o easter eggs.
6. En caso de que la serie, pelicula o videojuego no se encuentre en la base de datos (supabase) se le proporcionará una lista de películas, series o videojuegos similares.
7. En caso de que la serie, pelicula o videojuego sea parte de una saga, se le proporcionará un timeline o cronología de la saga en orden cronológico.
8. Que la interfaz de la plataforma tenga un diseño perzonalizado con variedad de opciones tomando inspiración del catálogo de la página para el usuario, la perzonalización debe ser guardada en la base de datos (supabase) y aparecerá después del inicio de seión o registro.
9. Los usuarios podrán añadir una reseña y calificación después de consumir algun contenido, la calificación será temática de la pelicula, serie o videojuego, la calificación máxima será de 5 y el máximo de caracteres serán 100, estos datos se guardarán en la base de datos (supabase).
10. Este tendrá un filtro de datos para que el usuario pueda buscar películas, series o videojuegos por nombre, género, año de lanzamiento, calificación, reseña, etc.
11. Al momento de encontrar el contenido de preferencia, se le proporcionará al usuario las plataformas en las que se encuentra disponible el contenido.
12. Se podrán desbloquear logros después de ver cierta cantidad de películas, series o videojuegos, estos logros desbloquearán fotos de perfil especiales y los logros se guardarán en la base de datos (supabase) y en el perfil del usuario.

Todo esto hazlo de una vez con Frontend y Backend.