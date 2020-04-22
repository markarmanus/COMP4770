## To Setup locally

1. clone the repo
2. install npm.
3. run `sudo npm install`
4. install docker on your computer : https://docs.docker.com/install/linux/docker-ce/ubuntu/
5. install docker-compose on your computer: https://docs.docker.com/compose/install/
6. run `docker-compose up`
7. access the website at localhost:5000.


## How to Use Level Editor:

- Ctrl+Q to test the current level editing.
- b to change the background.
- Shift+S to save the level.
- Right Click to delete an entity.
- Up and Down arrow keys to control the grid size.


## How the system works.

The system uses ECS, a level only contains the position and type of entity.
The EntityData file contains all the components of each entity, a generateEntity function in the Helper file, will dynamically instanciate objects of any components type passing it the properties defined in EntityData.
Systems will take all entieies and handle the logic releated to any component.

The PickUp System works by dynamacilly changing the entity that picks it up all the components that its supposed to change and will reverse after the timer. That way to define new pickups you only have to touch the EntityData file.


