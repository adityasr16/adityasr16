import sys

player1 = input("What is your name player 1? ")
player2 = input("What is your name player 2? ")

player1_move = input("player 1's move: ").lower()
player2_move = input("player 2's move: ").lower()

def game(move_1,move_2):
    
    if move_1 == move_2:
        return ("It's a tie")
    elif move_1 == "rock":
        if move_2 == "scissor":
            return (f"{Player1} wins!")
        elif move_2 == "paper":
            return (f"{player2} wins!")
    elif move_1 == "scissor":
        if move_2 == "paper":
            return (f"{player1} wins!")
        elif move_2 == "rock":
            return (f"{player2} wins!")
        
    elif move_1 == "paper":
        if move_2 == "rock":
            return (f"{player1} wins!")
        elif move_2 == "scissor":
            return (f"{player2} wins!")
    else:
        return ("*warning* invalid input.It's a rock-paper-scissor game, so enter either rock,paper or scissor ")
        
        sys.exit()
        
print(game(player1_move,player2_move))

        
    
            
