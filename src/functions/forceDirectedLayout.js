// 初始化节点位置
function initializePositions(nodes) {
    const width = 1000; // 布局的最大宽度
    const height = 1000; // 布局的最大高度
    nodes.forEach(node => {
        node.x = Math.random() * width;
        node.y = Math.random() * height;
        node.forceX = 0; // 初始化力为0
        node.forceY = 0; // 初始化力为0
    });
}

export function forceDirectedLayout(nodes, kRepulsion, kAttraction, maxMoveLimit, stopThreshold) {
    initializePositions(nodes);
    const maxIterations = 1000; // 最大迭代次数，以防无限循环
    let iteration = 0;
    let totalMovement = Infinity; // 跟踪节点移动总量

    while (iteration < maxIterations && totalMovement > stopThreshold) {
        totalMovement = 0;

        // 计算斥力
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].forceX = 0;
            nodes[i].forceY = 0;
            for (let j = 0; j < nodes.length; j++) {
                if (i !== j) {
                    let dx = nodes[j].x - nodes[i].x;
                    let dy = nodes[j].y - nodes[i].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let repulsiveForce = kRepulsion / distance;
                    nodes[i].forceX -= repulsiveForce * dx / distance;
                    nodes[i].forceY -= repulsiveForce * dy / distance;
                }
            }
        }

        // 计算引力
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[i].category === nodes[j].category) {
                    let dx = nodes[j].x - nodes[i].x;
                    let dy = nodes[j].y - nodes[i].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let attractiveForce = (distance * distance) / kAttraction;
                    let forceX = attractiveForce * dx / distance;
                    let forceY = attractiveForce * dy / distance;
                    nodes[i].forceX += forceX;
                    nodes[i].forceY += forceY;
                    nodes[j].forceX -= forceX;
                    nodes[j].forceY -= forceY;
                }
            }
        }

        // 更新位置
        for (let node of nodes) {
            let dx = Math.min(maxMoveLimit, Math.max(-maxMoveLimit, node.forceX));
            let dy = Math.min(maxMoveLimit, Math.max(-maxMoveLimit, node.forceY));
            node.x += dx;
            node.y += dy;
            totalMovement += Math.abs(dx) + Math.abs(dy);
        }

        iteration++;
    }

    return nodes;
}