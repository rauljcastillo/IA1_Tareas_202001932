let quantity_states = []
function addstate(states) {
    let exist = quantity_states.some(elem => (elem.location == states[0] && elem.posA == states[1] && elem.posB == states[2]))
    if (!exist) quantity_states.push({ location: states[0], posA: states[1], posB: states[2] })
}

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    let rand = parseInt(Math.random() * (2 - 0) + 0).toFixed()
    document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
    if (action_result == "CLEAN" && rand == 0) {
        if (location == "A") states[1] = "CLEAN"
        else if (location == "B") states[2] = "CLEAN"
    }
    else if (action_result == 'CLEAN') {
        if (location == "A") {
            states[1] = "CLEAN"
            states[2] = 'DIRTY'
        }
        else if (location == "B") {
            states[2] = "CLEAN"
            states[1] = 'DIRTY'
        }
    }
    else if (action_result == "RIGHT" && rand != 0) {
        states[0] = "B"
        states[1] = 'DIRTY'
    }
    else if (action_result == "LEFT" && rand != 0) {
        states[0] = "A"
        states[2] = 'DIRTY'
    }
    else if (action_result == "RIGHT") {
        states[0] = "B"
    }
    else if (action_result == "LEFT") {
        states[0] = "A"
    }
    addstate(states)
    setTimeout(() => {
        if (quantity_states.length != 8) test(states)
        else {
            clearInterval()
            let html = ""
            for (let index = 0; index < quantity_states.length; index++) {
                html += "<br>".concat(index + 1, ". ", quantity_states[index].location, " | ", quantity_states[index].posA, " | ", quantity_states[index].posB)
            }
            document.getElementById("log").innerHTML += html
        }
    }, 800)
}


var states = ["A", "CLEAN", "DIRTY"];
test(states);