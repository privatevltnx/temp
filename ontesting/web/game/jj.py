import random

class Player:
    def __init__(self, name, health=100, attack_power=10, defense=5):
        self.name = name
        self.health = health
        self.attack_power = attack_power
        self.defense = defense
        self.inventory = []

    def take_damage(self, amount):
        damage = amount - self.defense
        if damage > 0:
            self.health -= damage
        print(f"{self.name} takes {damage} damage. Health: {self.health}")

    def attack(self, target):
        damage = self.attack_power
        print(f"{self.name} attacks {target.name} for {damage} damage.")
        target.take_damage(damage)

    def add_to_inventory(self, item):
        self.inventory.append(item)
        print(f"{self.name} finds {item}.")

    def show_inventory(self):
        if self.inventory:
            print(f"{self.name}'s Inventory: {', '.join(self.inventory)}")
        else:
            print(f"{self.name}'s Inventory is empty.")

class Monster:
    def __init__(self, name, health=50, attack_power=8):
        self.name = name
        self.health = health
        self.attack_power = attack_power

    def take_damage(self, amount):
        self.health -= amount
        print(f"{self.name} takes {amount} damage. Health: {self.health}")

    def attack(self, target):
        damage = self.attack_power
        print(f"{self.name} attacks {target.name} for {damage} damage.")
        target.take_damage(damage)

    def is_alive(self):
        return self.health > 0

def battle(player, monster):
    print(f"A wild {monster.name} appears!")
    while player.is_alive() and monster.is_alive():
        action = input("Do you want to attack or run? (a/r): ").strip().lower()
        if action == 'a':
            player.attack(monster)
            if monster.is_alive():
                monster.attack(player)
        elif action == 'r':
            print(f"{player.name} runs away!")
            return
        else:
            print("Invalid action. Try again.")
    if not monster.is_alive():
        print(f"{player.name} defeats the {monster.name}!")

def explore(player):
    events = ['nothing', 'monster', 'treasure', 'trap']
    event = random.choice(events)
    if event == 'nothing':
        print("You found nothing.")
    elif event == 'monster':
        monster = Monster(f"Orc", random.randint(40, 60), random.randint(5, 10))
        battle(player, monster)
    elif event == 'treasure':
        treasure = random.choice(['gold', 'sword', 'potion'])
        print(f"You found a {treasure}!")
        player.add_to_inventory(treasure)
    elif event == 'trap':
        damage = random.randint(5, 20)
        print(f"You walked into a trap! It deals {damage} damage.")
        player.take_damage(damage)

def main():
    player_name = input("Enter your player name: ")
    player = Player(player_name)

    while player.is_alive():
        action = input("\nDo you want to explore or check inventory? (e/i): ").strip().lower()
        if action == 'e':
            explore(player)
        elif action == 'i':
            player.show_inventory()
        else:
            print("Invalid action. Try again.")

        if not player.is_alive():
            print(f"Game Over! {player.name} has been defeated.")
        elif player.health <= 20:
            print(f"Warning: {player.name} is critically low on health!")

if __name__ == "__main__":
    main()
